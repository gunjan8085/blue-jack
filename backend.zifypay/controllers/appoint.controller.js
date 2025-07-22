// const Appointment = require("../models/appoint.model");
const Appoint = require("../models/appoint.model");
const path = require("path");
const Business = require("../models/business.model");
const Service = require("../models/services.model");
const Employee = require("../models/employee.model");
const { log, trace } = require("console");
const { sendAppointmentMail } = require("../services/mail.service");
const customerService = require("../services/customer.service");
const User = require("../models/user.model");
const { scheduleAppointmentReminders } = require("../services/appointment.service");
const {  validatePaymentDetails , generateRequestId } = require("../services/batch_counter");
const axios = require('axios');
const qs = require('querystring');
const { parseStringPromise } = require("xml2js");
const fs = require('fs');


// const logger = require('../services/logger');

const logger = {
  info: (operation, message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] [${operation}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  },
  error: (operation, message, error = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [ERROR] [${operation}] ${message}`);
    if (error) {
      console.error(`[${timestamp}] [ERROR] [${operation}] Error Details:`, {
        message: error.message,
        stack: error.stack,
        response: error?.response?.data,
        status: error?.response?.status,
        code: error.code
      });
    }
  },
  debug: (operation, step, data) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [DEBUG] [${operation}] ${step}:`, JSON.stringify(data, null, 2));
  },
  warn: (operation, message, data = null) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [WARN] [${operation}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }
};

function generateBatchId() {
  const currentDate = new Date();
  const datePrefix = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format as YYYYMMDD

  // Path to store batch count file
  const batchCountFilePath = path.join("../", 'batchCount.json');

  let batchCount = 1; // Default to 1 if the count file doesn't exist

  try {
    // Check if the batch count file exists
    if (fs.existsSync(batchCountFilePath)) {
      const data = fs.readFileSync(batchCountFilePath, 'utf8');
      const jsonData = JSON.parse(data);

      // Check if the stored date matches today
      if (jsonData.date === datePrefix) {
        batchCount = jsonData.count + 1; // Increment the counter for the day
      }
    }

    // Update the batch count in the file
    const newData = {
      date: datePrefix, // Save the current date in YYYYMMDD format
      count: batchCount
    };
    fs.writeFileSync(batchCountFilePath, JSON.stringify(newData));

  } catch (error) {
    console.error('Error reading or writing batch count file:', error);
  }

  // Generate the final BATCH_ID in the format: YYYYMMDDXX (with two-digit counter)
  const batchId = `${datePrefix}${String(batchCount).padStart(2, '0')}`;
  console.log(batchId);  // Output for debugging
  
  return batchId;
}

const extractFieldFromXML = (xmlString, fieldKey) => {
  try {
    const regex = new RegExp(`<FIELD KEY="${fieldKey}">(.*?)</FIELD>`, 'i');
    const match = xmlString.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
};

const processPayment = async ({
  service,
  staff,
  date,
  time,
  customer,
  user,
  businessId,
  appointmentId,
  paymentDetails // { cardNumber, expDate, cvv, firstName, lastName, address, city, state, zipCode }
}) => {
  const operation = 'PROCESS_PAYMENT';
  const requestId = generateRequestId();
  logger.info(operation, `Starting payment process for appointment: ${appointmentId}`, { requestId });
 try {

  const business = await require("../models/business.model").findById(businessId);
   if (!business) {
      logger.error(operation, `Business not found: ${businessId}`, { requestId });
      return { success: false, error: "Business not found" };
    }
  // STEP 2: Validate payment account credentials
    const paymentCreds = business.connectedPaymentAccount;
    if (!paymentCreds || !paymentCreds.CUST_NBR || !paymentCreds.MERCH_NBR || !paymentCreds.DBA_NBR || !paymentCreds.TERMINAL_NBR) {
      logger.error(operation, `Invalid payment credentials for business: ${businessId}`, { requestId });
      return { success: false, error: "Business payment account not properly configured" };
    }  

// STEP 3: Fetch and validate service details
    const serviceDetails = business.serviceCategories.find(s => s._id.toString() === service.toString());
      // .findById(service)
      // .select("price")
    if (!serviceDetails) {
      logger.error(operation, `Service not found: ${service}`, { requestId });
      return { success: false, error: "Service not found" };
    }
  const serviceAmount =  serviceDetails.price; 

  if (!serviceAmount || serviceAmount <= 0) {
      logger.error(operation, `Invalid service amount: ${serviceAmount}`, { requestId });
      return { success: false, error: "Invalid service pricing" };
    }

     // STEP 4: Fetch staff details for validation
    const staffDetails = await require("../models/employee.model")
      .findById(staff);

    if (!staffDetails) {
      logger.error(operation, `Staff not found: ${staff}`, { requestId });
      return { success: false, error: "Staff member not found" };
    }

    // STEP 5: Validate payment details
    if (!paymentDetails || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      logger.error(operation, 'Missing payment details', { requestId });
      return { success: false, error: "Missing payment details" };
    }


    // STEP 6: Generate transaction identifiers
  const TRAN_NBR = Math.floor(1000000000 + Math.random() * 9000000000);
  const transactionId = `TXN_${Date.now()}_${TRAN_NBR}`;
  const BATCH_ID = generateBatchId();

   // STEP 7: Create payment history entry (pending status)
    const paymentHistoryEntry = {
      transactionId,
      amount: serviceAmount,
      date: new Date(),
      status: "pending",
      customerName: customer.name,
      customerNumber: customer.phone,
      customerEmail: customer.email,
      paymentMethod: "card",
      appointmentId,
      serviceId: service,
      staffId: staff,
      epxTransactionNumber: TRAN_NBR,
      batchId: BATCH_ID
    };

     // Add to business payment history
    await require("../models/business.model").findByIdAndUpdate(
      businessId,
      { $push: { paymentHistory: paymentHistoryEntry } },
      { new: true }
    );
    logger.info(operation, `Payment history entry created: ${transactionId}`, { requestId });

    // STEP 8: Prepare EPX transaction payload
    const {
      CUST_NBR,
      MERCH_NBR,
      DBA_NBR,
      TERMINAL_NBR,
      NAME = "NORTH"
    } = paymentCreds;

      const basePayload = {
      CUST_NBR,
      MERCH_NBR,
      DBA_NBR,
      TERMINAL_NBR,
      TRAN_TYPE: 'CCE1',
      AMOUNT: parseFloat(serviceAmount).toFixed(2),
      BATCH_ID,
      TRAN_NBR,
      ACCOUNT_NBR: paymentDetails.cardNumber.replace(/\s/g, ''),
      EXP_DATE: paymentDetails.expiryDate,
      CARD_ENT_METH: "E",
      CVV2: paymentDetails.cvv,
      FIRST_NAME: paymentDetails.firstName.trim(),
      LAST_NAME: paymentDetails.lastName.trim(),
      ADDRESS: paymentDetails.address.trim(),
      CITY: paymentDetails.city.trim(),
      STATE: paymentDetails.state.trim(),
      ZIP_CODE: paymentDetails.zipCode.trim(),
      // INDUSTRY_TYPE: 'E',
    };

    logger.info(operation, `Prepared EPX payload for transaction: ${TRAN_NBR}`, { requestId });
    logger.debug(operation, 'EPX REQUEST PAYLOAD', { ...basePayload, ACCOUNT_NBR: '**** **** **** ' + basePayload.ACCOUNT_NBR.slice(-4), CVV2: '***' });

    // STEP 9: Send transaction to EPX
    const response = await axios.post(
      'https://secure.epxuap.com',
      qs.stringify(basePayload),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 45000
      }
    );

    const xmlResponse = response.data;
    logger.info(operation, 'EPX RESPONSE RECEIVED', { requestId, responseLength: xmlResponse.length });
// const parsed = await parseStringPromise(xmlResponse);
console.log(xmlResponse);



    // STEP 10: Parse EPX response
    const isSuccess = typeof xmlResponse === 'string' && xmlResponse.includes('<FIELD KEY="AUTH_RESP">00</FIELD>');
    const authCode = extractFieldFromXML(xmlResponse, 'AUTH_CODE');
    const responseMessage = extractFieldFromXML(xmlResponse, 'RESP_MSG') || 'Unknown response';
    const referenceNumber = extractFieldFromXML(xmlResponse, 'REF_NBR');

    // log these three fields
    logger.debug(operation, 'EPX RESPONSE DETAILS', {
      requestId,
      isSuccess,
      authCode,
      referenceNumber,
      responseMessage
    });
    // STEP 11: Log transaction details
    const logContent = `
        [PAYMENT TRANSACTION]
        Request ID: ${requestId}
        Transaction ID: ${transactionId}
        EPX Transaction Number: ${TRAN_NBR}
        Appointment ID: ${appointmentId}
        Business: ${business.brandName || business.name}
        Service: ${serviceDetails.name}
        Staff: ${staffDetails.name}
        Customer: ${customer.name} (${customer.email})
        Amount: $${serviceAmount}
        Timestamp: ${new Date().toISOString()}

        --- REQUEST ---
        ${qs.stringify({ ...basePayload, ACCOUNT_NBR: '**** **** **** ' + basePayload.ACCOUNT_NBR.slice(-4), CVV2: '***' })}

        --- RESPONSE ---
        ${xmlResponse}

        --- RESULT ---
        Success: ${isSuccess}
        Auth Code: ${authCode || 'N/A'}
        Reference: ${referenceNumber || 'N/A'}
        Message: ${responseMessage}
    `;

    // STEP 12: Update payment history based on result
    const updateData = {
      status: isSuccess ? "success" : "failed",
      epxResponse: xmlResponse,
      authCode,
      referenceNumber,
      responseMessage,
      processedAt: new Date()
    };

    await require("../models/business.model").updateOne(
      { _id: businessId, "paymentHistory.transactionId": transactionId },
      { $set: { "paymentHistory.$": { ...paymentHistoryEntry, ...updateData } } }
    );

    if (isSuccess) {
      logger.info(operation, `Payment successful: ${transactionId}`, { 
        requestId, 
        authCode, 
        referenceNumber, 
        amount: serviceAmount 
      });
       return {
        success: true,
        paymentId: transactionId,
        transactionNumber: TRAN_NBR,
        authCode,
        referenceNumber,
        amount: serviceAmount,
        currency: 'USD',
        responseMessage
      };
    } else {
      logger.warn(operation, `Payment failed: ${transactionId}`, { 
        requestId, 
        responseMessage, 
        amount: serviceAmount 
      });

      return {
        success: false,
        error: responseMessage || 'Payment declined',
        paymentId: transactionId,
        transactionNumber: TRAN_NBR,
        responseMessage
      };
    }
    } catch (error) {
        logger.error(operation, `Payment processing error: ${error.message}`, { 
          requestId, 
          appointmentId,
          businessId,
          stack: error.stack 
        });
        }
 try {
      await require("../models/business.model").updateOne(
        { _id: businessId, "paymentHistory.transactionId": transactionId },
        { 
          $set: { 
            "paymentHistory.$.status": "failed",
            "paymentHistory.$.error": error.message,
            "paymentHistory.$.processedAt": new Date()
          } 
        }
      );
    } catch (updateError) {
      logger.error(operation, `Failed to update payment history: ${updateError.message}`, { requestId });
    }

    return {
      success: false,
      error: 'Payment processing failed. Please try again.',
      details: error.message
    };
  }
;

const checkAvailability = async (req, res) => {
  try {
    const { staff, date, time } = req.body;

    if (!staff || !date || !time) {
      return res.status(400).json({ success: false, message: "Missing required query parameters: staff, date, time" });
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const normalizedTime = time.trim().padStart(5, '0');
    const normalizedDate = date.trim();

    if (!timeRegex.test(normalizedTime)) {
      return res.status(400).json({ success: false, message: "Invalid time format. Use HH:mm" });
    }

    // Check if slot is already booked
    const existing = await Appoint.findOne({
      staff,
      date: normalizedDate,
      time: normalizedTime,
      status: { $ne: "cancelled" }
    });

    const isAvailable = !existing;

    return res.status(200).json({ success: true, available: isAvailable });
  } catch (err) {
    console.error("Error checking availability:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// 💡 Flow:
// User selects date, time, staff → slot is checked for availability

// Slot is "soft-reserved" temporarily (not yet confirmed)

// Payment is processed

// If payment succeeds:

//  Confirm the appointment (status: confirmed)

// If payment fails:

//  Release the slot (do not create or cancel appointment)
const createAppointment = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { service, staff, date, time, customer, user,
       paymentDetails  // { cardNumber, expDate, cvv, firstName, lastName, address, city, state, zipCode }
       } = req.body;

    // Basic validation
    if (!service || !staff || !date || !time || !customer?.name || !customer?.email || !customer?.phone || !user) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate payment details
    if (!paymentDetails) {
      return res.status(400).json({ success: false, message: "Payment details required" });
    }

    const paymentValidation = validatePaymentDetails(paymentDetails);
    if (!paymentValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment details",
        errors: paymentValidation.errors
      });
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const trimmedTime = time.trim();

    if (!timeRegex.test(trimmedTime)) {
      return res.status(400).json({ success: false, message: "Invalid time format. Use HH:mm format." });
    }

    // Normalize date and time
    const normalizedDate = date.trim();
    const normalizedTime = trimmedTime.padStart(5, '0');

    // STEP 1: Check slot availability
    const existing = await require("../models/appointment.model").findOne({
      staff,
      date: normalizedDate,
      time: normalizedTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "This time slot is not available" });
    }
    console.log("step 2 is started");
    
    // STEP 2: Create appointment with "pending" status (soft reservation)

    console.log("appointment creation started with this payload " , 
      {
      business: businessId,
      service,
      staff,
      user,
      date: normalizedDate,
      time: normalizedTime,
      customer,
      // status: "pending"
    }
    );
    
    const pendingAppointment = await require("../models/appoint.model").create({
      business: businessId,
      service,
      staff,
      user,
      date: normalizedDate,
      time: normalizedTime,
      customer,
      status: "pending"
    });

    console.log("Appointment created with pending status:", pendingAppointment._id);

    try {
      // STEP 3: Process payment with complete workflow
      const paymentResult = await processPayment({
        service,
        staff,
        date: normalizedDate,
        time: normalizedTime,
        customer,
        user,
        businessId,
        appointmentId: pendingAppointment._id,
        paymentDetails
      });

      if (!paymentResult.success) {
        // STEP 4a: Payment failed - remove the pending appointment
        await require("../models/appoint.model").findByIdAndDelete(pendingAppointment._id);
        console.log("Payment failed, appointment removed:", pendingAppointment._id);

        return res.status(402).json({
          success: false,
          message: paymentResult.error || "Payment failed. Please try again.",
          paymentDetails: {
            transactionId: paymentResult.paymentId,
            responseMessage: paymentResult.responseMessage
          }
        });
      }

      // STEP 4b: Payment succeeded - confirm the appointment
      const confirmedAppointment = await require("../models/appoint.model").findByIdAndUpdate(
        pendingAppointment._id,
        {
          status: "confirmed",
          // paymentId: paymentResult.paymentId,
          // transactionNumber: paymentResult.transactionNumber,
          paymentStatus: "completed",
          // authCode: paymentResult.authCode,
          // referenceNumber: paymentResult.referenceNumber,
          // paidAmount: paymentResult.amount
        },
        { new: true }
      );

      console.log("Payment successful, appointment confirmed:", confirmedAppointment._id);

      // Update business appointment count
      await require("../models/business.model").findByIdAndUpdate(
        businessId,
        { $inc: { appointmentCount: 1 } }
      );

      // Fetch business, service, staff details for email
      let business, serviceObj, staffObj;
      try {
        [business, serviceObj, staffObj] = await Promise.all([
          require("../models/business.model").findById(businessId),
          require("../models/services.model").findById(service),
          require("../models/employee.model").findById(staff)
        ]);
      } catch (e) {
        console.error("Error fetching business/service/staff details:", e);
      }

      // Compose details for email
      const businessName = business?.brandName || business?.name || "Business";
      const serviceName = serviceObj?.name || "Service";
      const staffName = staffObj?.name || "Staff";
      const location = business?.address?.addressLine1
        ? `${business.address.addressLine1}, ${business.address.city}`
        : "";

      // Send appointment confirmation email (non-blocking)
      sendAppointmentMail(
        customer.email,
        customer.name,
        businessName,
        serviceName,
        staffName,
        normalizedDate,
        normalizedTime,
        location,
        {
          paymentId: paymentResult.paymentId,
          amount: paymentResult.amount,
          authCode: paymentResult.authCode
        }
      ).catch((err) => console.error("Appointment email error:", err));

      // Schedule appointment reminders
      scheduleAppointmentReminders({
        customer,
        businessName,
        serviceName,
        staffName,
        normalizedDate,
        normalizedTime,
        location,
        appointmentId: confirmedAppointment._id
      });

      res.status(201).json({
        success: true,
        message: "Appointment booked and payment processed successfully",
        data: {
          appointment: confirmedAppointment,
          payment: {
            transactionId: paymentResult.paymentId,
            amount: paymentResult.amount,
            currency: paymentResult.currency,
            authCode: paymentResult.authCode,
            referenceNumber: paymentResult.referenceNumber
          }
        }
      });

    } catch (paymentError) {
      // STEP 4c: Payment processing error - clean up
      await require("../models/appointment.model").findByIdAndDelete(pendingAppointment._id);
      console.error("Payment processing error:", paymentError);

      return res.status(500).json({
        success: false,
        message: "Payment processing failed. Please try again."
      });
    }

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "This slot is already booked" });
    }
    console.error("Create appointment error:", err);
    next(err);
  }
};

const createAppointmentByBusiness = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { service, staff, date, time, customer, user } = req.body;

    // Step 1: Validate required fields
    if (!service || !staff || !date || !time || !customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const trimmedDate = date.trim();
    const trimmedTime = time.trim();

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!dateRegex.test(trimmedDate)) {
      return res.status(400).json({ success: false, message: "Invalid date format (expected YYYY-MM-DD)" });
    }

    if (!timeRegex.test(trimmedTime)) {
      return res.status(400).json({ success: false, message: "Invalid time format (expected HH:mm)" });
    }

    // Validate full datetime to ensure it's schedulable
    const fullDateTime = new Date(`${trimmedDate}T${trimmedTime}`);
    if (isNaN(fullDateTime.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid datetime value for scheduling" });
    }

    // Step 2: Check for double booking
    const existing = await Appoint.findOne({
      staff,
      date: trimmedDate,
      time: trimmedTime,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "This slot is already booked." });
    }

    // Step 3: Find or create user
    let userIdToUse = user;
    try {
      const existingUser = await User.findOne({
        $or: [{ email: customer.email }, { phone: customer.phone }],
      });

      if (existingUser) {
        userIdToUse = existingUser._id;
      } else {
        const newUser = await User.create({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        });
        userIdToUse = newUser._id;
      }
    } catch (userError) {
      console.error("⚠️ User lookup/creation failed:", userError.message);
    }

    if (!userIdToUse) {
      return res.status(500).json({ success: false, message: "Failed to associate a user with this appointment." });
    }

    // Step 4: Create appointment
    const appointment = await Appoint.create({
      business: businessId,
      service,
      staff,
      user: userIdToUse,
      date: trimmedDate,
      time: trimmedTime,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });

    // Step 5: Increment appointment count
    await Business.findByIdAndUpdate(businessId, { $inc: { appointmentCount: 1 } });

    // Step 6: Fetch metadata
    let businessInfo, serviceInfo, staffInfo;
    try {
      businessInfo = await Business.findById(businessId);
      serviceInfo = await Service.findById(service);
      staffInfo = await Employee.findById(staff);
    } catch (metaError) {
      console.error("⚠️ Failed to fetch service/staff/business info:", metaError.message);
    }

    const businessName = businessInfo?.brandName || businessInfo?.name || "Business";
    const serviceName = serviceInfo?.name || "Service";
    const staffName = staffInfo?.name || "Staff";
    const location = businessInfo?.address?.addressLine1
      ? `${businessInfo.address.addressLine1}, ${businessInfo.address.city || ""}`
      : "";

    // Step 7: Send email
    sendAppointmentMail(
      customer.email,
      customer.name,
      businessName,
      serviceName,
      staffName,
      trimmedDate,
      trimmedTime,
      location
    ).catch((err) => console.error("📧 Email error:", err.message));

    // Step 8: Schedule reminder
    try {
      scheduleAppointmentReminders({
        customer,
        businessName,
        serviceName,
        staffName,
        date: trimmedDate,
        time: trimmedTime,
        location,
      });
    } catch (cronError) {
      console.error("🕒 Reminder scheduling error:", cronError.message);
    }

    // Step 9: Return response
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });

  } catch (err) {
    console.error("🔥 Appointment creation error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong while creating appointment.",
    });
  }
};

const getAppointmentsForBusiness = async (req, res, next) => {
  try {
    const { businessId } = req.params;

    console.log(`[INFO] Fetching business ${businessId}`);
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    console.log(`[INFO] Found ${business.serviceCategories.length} services (stored as categories)`);
    business.serviceCategories.forEach((s, i) => {
      console.log(` - [${i + 1}] ${s.title} (${s._id})`);
    });

    const appointments = await Appoint.find({ business: businessId })
      .populate("staff", "name")
      .sort({ createdAt: -1 });

    console.log(`[INFO] Fetched ${appointments.length} appointments`);

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      const rawService = appointment.service;
      const appointmentServiceId = rawService?._id?.toString() || rawService?.toString();

      console.log(`\n[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer?.name}`);
      console.log(` - Service ID: ${appointmentServiceId}`);

      const matchedService = business.serviceCategories.find(
        s => s._id?.toString() === appointmentServiceId
      );

      if (!matchedService && appointmentServiceId) {
        console.warn(` ❌ No matching service for ${appointmentServiceId}`);
        console.log(' 🔍 Available service IDs:', business.serviceCategories.map(s => s._id?.toString()));
      } else {
        console.log(` ✅ Matched service: ${matchedService?.title}`);
      }

      appointmentObj.service = matchedService
        ? {
          _id: matchedService._id,
          title: matchedService.title,
          price: matchedService.price,
          duration: matchedService.duration
        }
        : null;

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });

  } catch (err) {
    console.error("[FATAL] Error fetching appointments:", err);
    next(err);
  }
};


// Get total bookings for a business
const getTotalBookings = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const total = await Appoint.countDocuments({ business: businessId });
    res.status(200).json({ success: true, totalBookings: total });
  } catch (err) {
    console.error("Error fetching total bookings:", err);
    next(err);
  }
};

const getMonthlyRevenue = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Fetch business to get serviceCategories (for price lookup)
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Find all appointments for this business in the current month with status 'completed'
    const appointments = await Appoint.find({
      business: businessId,
      createdAt: { $gte: firstDay, $lte: lastDay },
      status: "completed",
    });

    // Create a map of service IDs to their prices for quick lookup
    const servicePriceMap = {};
    appointments.forEach(appointment => {
      const serviceId = appointment.service.toString();
      const price = business.serviceCategories.find(s => s._id?.toString() === serviceId)?.price;
      if (price !== undefined) {
        servicePriceMap[serviceId] = price;
      }
    });

    // Calculate revenue by summing the price of each appointment's service
    let revenue = 0;
    for (const appointment of appointments) {

      const serviceId = appointment.service.toString();
      const price = servicePriceMap[serviceId];
      if (price !== undefined) {
        revenue += price;
      }
    }

    res.status(200).json({ success: true, monthlyRevenue: revenue });
  } catch (err) {
    console.error("Error calculating monthly revenue:", err);
    next(err);
  }
};


const getTodaysAppointments = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    console.log(`[INFO] Fetching business ${businessId}`);
    const business = await Business.findById(businessId);
    if (!business) {
      console.error(`[ERROR] Business ${businessId} not found`);
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Log available service categories (which are services in your case)
    console.log(`[INFO] Service Categories (acting as services): ${business.serviceCategories.length}`);
    business.serviceCategories.forEach((s, i) => {
      console.log(` - [${i + 1}] ${s.title} (${s._id})`);
    });

    const appointments = await Appoint.find({ business: businessId, date: todayStr })
      .populate("staff", "name")
      .sort({ time: 1 });

    console.log(`[INFO] Found ${appointments.length} appointments on ${todayStr}`);

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      const rawService = appointment.service;
      const appointmentServiceId = rawService?._id?.toString() || rawService?.toString();

      console.log(`\n[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer?.name}`);
      console.log(` - Service ID in appointment: ${appointmentServiceId}`);

      let matchedService = business.serviceCategories.find(
        s => s._id?.toString() === appointmentServiceId
      );

      if (!matchedService && appointmentServiceId) {
        console.warn(` ❌ No matching service found for ID: ${appointmentServiceId}`);
        console.log(' 🔍 All available service IDs:', business.serviceCategories.map(s => s._id?.toString()));
      } else {
        console.log(` ✅ Matched service: ${matchedService?.title}`);
      }

      appointmentObj.service = matchedService
        ? {
          _id: matchedService._id,
          title: matchedService.title,
          price: matchedService.price,
          duration: matchedService.duration
        }
        : null;

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });

  } catch (err) {
    console.error("[FATAL] Error in getTodaysAppointments:", err);
    next(err);
  }
};


// Get recent bookings for a business (last 5)
// Get recent bookings for a business (last 5)
const getRecentBookings = async (req, res, next) => {
  try {
    const { businessId } = req.params;

    console.log(`[INFO] Fetching business ${businessId}`);
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    console.log(`[INFO] Found ${business.serviceCategories.length} service categories`);
    business.serviceCategories.forEach((s, i) => {
      console.log(` - [${i + 1}] ${s.title} (${s._id})`);
    });

    const appointments = await Appoint.find({ business: businessId })
      .populate("staff", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    console.log(`[INFO] Fetched ${appointments.length} recent appointments`);

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      const rawService = appointment.service;
      const appointmentServiceId = rawService?._id?.toString() || rawService?.toString();

      console.log(`\n[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer?.name}`);
      console.log(` - Service ID: ${appointmentServiceId}`);

      const matchedService = business.serviceCategories.find(
        s => s._id?.toString() === appointmentServiceId
      );

      if (!matchedService && appointmentServiceId) {
        console.warn(` ❌ No matching service for ${appointmentServiceId}`);
        console.log(' 🔍 Available service IDs:', business.serviceCategories.map(s => s._id?.toString()));
      } else {
        console.log(` ✅ Matched service: ${matchedService?.title}`);
      }

      appointmentObj.service = matchedService
        ? {
          _id: matchedService._id,
          title: matchedService.title,
          price: matchedService.price,
          duration: matchedService.duration
        }
        : null;

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });

  } catch (err) {
    console.error("[FATAL] Error fetching recent bookings:", err);
    next(err);
  }
};


// Get appointments for a customer by email
const getAppointmentsForCustomer = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const appointments = await Appoint.find({ "customer.email": email })
      .populate("business", "name")
      .populate("service", "title")
      .populate("staff", "name")
      .sort({ date: -1, time: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    console.error("Error fetching customer appointments:", err);
    next(err);
  }
};

// Get appointments for a user by userId
const getAppointmentsForUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const appointments = await Appoint.find({ user: userId })
      .populate("business", "brandName thumbnail avgReview address")
      .populate("service", "name serviceType duration")
      .populate("staff", "name profilePicUrl")
      .sort({ date: -1, time: -1 });

    // Map to frontend expected format
    const mapped = appointments.map((apt) => {
      return {
        id: apt._id,
        businessName: apt.business?.brandName || "",
        serviceName: apt.service?.name || "",
        staffName: apt.staff?.name || "",
        date: apt.date,
        time: apt.time,
        status: apt.status,
        logo: apt.business?.thumbnail || "",
        category: apt.service?.serviceType || "",
        businessRating: apt.business?.avgReview || 0,
        duration: apt.service?.duration || 0,
        location: apt.business?.address ? `${apt.business.address.addressLine1}, ${apt.business.address.city}` : "",
        paymentAmount: apt.paymentAmount || 0,
        paymentStatus: apt.paymentStatus || "pending",
        userRating: apt.userRating || 0,
        userReview: apt.userReview || "",
      };
    });
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error("Error fetching user appointments:", err);
    next(err);
  }
};

// Update appointment status by ID
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }
    const updated = await Appoint.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, message: "Status updated", data: updated });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    next(err);
  }
};

// Get today's revenue for a business
// Get today's revenue for a business
const getTodaysRevenue = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    // Fetch business to get serviceCategories (for price lookup)
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Find all appointments for this business for today with status 'completed'
    const appointments = await Appoint.find({
      business: businessId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: "completed",
    });

    console.log(`Today's appointments:`, appointments);

    // Create a map of service IDs to their prices for quick lookup
    const servicePriceMap = {};
    appointments.forEach(appointment => {
      const serviceId = appointment.service.toString();
      const price = business.serviceCategories.find(s => s._id?.toString() === serviceId)?.price;
      if (price !== undefined) {
        servicePriceMap[serviceId] = price;
      }
    });

    console.log(`servicePriceMap:`, servicePriceMap);

    // Calculate revenue by summing the price of each appointment's service
    let revenue = 0;
    for (const appointment of appointments) {
      console.log(`[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer.name}`);

      const serviceId = appointment.service.toString();
      const price = servicePriceMap[serviceId];

      if (price !== undefined) {
        revenue += price;
        console.log(` - Service Price: ${price}`);
      } else {
        console.log(` - Warning: No price found for service ID ${serviceId}`);
      }
    }

    console.log(`[INFO] Total today's revenue: ${revenue}`);
    res.status(200).json({ success: true, todaysRevenue: revenue });
  } catch (err) {
    console.error("Error calculating today's revenue:", err);
    next(err);
  }
};

// Get today's bookings count for a business
const getTodaysBookingsCount = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const count = await Appoint.countDocuments({
      business: businessId,
      date: todayStr,
      status: { $ne: "cancelled" },
    });
    res.status(200).json({ success: true, bookingsToday: count });
  } catch (err) {
    console.error("Error calculating today's bookings count:", err);
    next(err);
  }
};

// Get total unique customers for a business
const getTotalCustomers = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    // Find all appointments for this business
    const appointments = await Appoint.find({ business: businessId });
    // Use a Set to collect unique customer emails
    const uniqueEmails = new Set();
    appointments.forEach(app => {
      if (app.customer && app.customer.email) {
        uniqueEmails.add(app.customer.email);
      }
    });
    res.status(200).json({ success: true, totalCustomers: uniqueEmails.size });
  } catch (err) {
    console.error("Error calculating total customers:", err);
    next(err);
  }
};

// Get completed appointments for a user by userId
const getCompletedAppointmentsForUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const appointments = await Appoint.find({ user: userId, status: "completed" })
      .populate("business", "brandName thumbnail avgReview address")
      .populate("service", "name serviceType duration")
      .populate("staff", "name profilePicUrl")
      .sort({ date: -1, time: -1 });

    // Map to frontend expected format
    const mapped = appointments.map((apt) => {
      return {
        id: apt._id,
        businessId: apt.business?._id?.toString() || "",
        businessName: apt.business?.brandName || "",
        service: apt.service?.name || "",
        staffName: apt.staff?.name || "",
        date: apt.date,
        time: apt.time,
        status: apt.status,
        logo: apt.business?.thumbnail || "",
        category: apt.service?.serviceType || "",
        businessRating: apt.business?.avgReview || 0,
        duration: apt.service?.duration || 0,
        location: apt.business?.address ? `${apt.business.address.addressLine1}, ${apt.business.address.city}` : "",
        paymentAmount: apt.paymentAmount || 0,
        paymentStatus: apt.paymentStatus || "pending",
        userRating: apt.userRating || 0,
        userReview: apt.userReview || "",
      };
    });
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error("Error fetching completed user appointments:", err);
    next(err);
  }
};

// Get completed appointments for a customer by email
const getCompletedAppointmentsForCustomerByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const appointments = await Appoint.find({ "customer.email": email, status: "completed" })
      .populate("business", "brandName thumbnail avgReview address")
      .populate("service", "name serviceType duration")
      .populate("staff", "name profilePicUrl")
      .sort({ date: -1, time: -1 });

    // Map to frontend expected format
    const mapped = appointments.map((apt) => {
      return {
        id: apt._id,
        businessId: apt.business?._id?.toString() || "",
        businessName: apt.business?.brandName || "",
        service: apt.service?.name || "",
        staffName: apt.staff?.name || "",
        date: apt.date,
        time: apt.time,
        status: apt.status,
        logo: apt.business?.thumbnail || "",
        category: apt.service?.serviceType || "",
        businessRating: apt.business?.avgReview || 0,
        duration: apt.service?.duration || 0,
        location: apt.business?.address ? `${apt.business.address.addressLine1}, ${apt.business.address.city}` : "",
        paymentAmount: apt.paymentAmount || 0,
        paymentStatus: apt.paymentStatus || "pending",
        userRating: apt.userRating || 0,
        userReview: apt.userReview || "",
      };
    });
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error("Error fetching completed customer appointments:", err);
    next(err);
  }
};

// Get average rating for a business
const getAverageRating = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const reviews = await require('../models/review.model').find({ forBusiness: businessId });
    if (!reviews.length) {
      return res.status(200).json({ success: true, averageRating: 0 });
    }
    const totalStars = reviews.reduce((sum, r) => sum + (r.stars || 0), 0);
    const avg = totalStars / reviews.length;
    res.status(200).json({ success: true, averageRating: avg });
  } catch (err) {
    next(err);
  }
};

// Get customer satisfaction (percentage of 4 or 5 star reviews) for a business
const getCustomerSatisfaction = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const reviews = await require('../models/review.model').find({ forBusiness: businessId });
    if (!reviews.length) {
      return res.status(200).json({ success: true, customerSatisfaction: 0 });
    }
    const satisfiedCount = reviews.filter(r => r.stars >= 4).length;
    const percentage = (satisfiedCount / reviews.length) * 100;
    res.status(200).json({ success: true, customerSatisfaction: percentage });
  } catch (err) {
    next(err);
  }
};


const getCustomerVisitHistory = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { page = 1, limit = 10, sortBy = "recent" } = req.query;

    const result = await customerService.getCustomerVisitHistory(
      businessId,
      parseInt(page),
      parseInt(limit),
      sortBy
    );

    res.json({
      success: true,
      data: result.customers,
      pagination: result.pagination
    });
  } catch (err) {
    next(new ApiError(500, "Failed to fetch customer visit history", err));
  }
}

const getTopCustomers = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { limit = 5 } = req.query;

    const topCustomers = await customerService.getTopCustomers(
      businessId,
      parseInt(limit)
    );

    res.json({
      success: true,
      data: topCustomers
    });
  } catch (err) {
    next(new ApiError(500, "Failed to fetch top customers", err));
  }
}

// Get all booked times for a staff member on a given date
const getBookedTimesForEmployee = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const { date } = req.query;
    if (!staffId || !date) {
      return res.status(400).json({ success: false, message: "Missing staffId or date" });
    }
    const appointments = await Appoint.find({
      staff: staffId,
      date,
      status: { $ne: "cancelled" }
    }).select("time");
    const bookedTimes = appointments.map(a => a.time);
    res.json({ success: true, data: bookedTimes });
  } catch (err) {
    next(err);
  }
};

// GET /api/v1/appointments/:businessId/analytics
const getBusinessAnalytics = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const Appoint = require("../models/appoint.model");
    const Business = require("../models/business.model");
    const Employee = require("../models/employee.model");
    const Review = require("../models/review.model");
    const mongoose = require("mongoose");

    // Fetch all appointments for this business
    const appointments = await Appoint.find({ business: businessId });
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Revenue and appointment stats
    let totalRevenue = 0;
    let completedAppointments = 0;
    let cancelledAppointments = 0;
    let noShowAppointments = 0; // If you have a 'no-show' status, otherwise 0
    let totalAppointments = appointments.length;
    let appointmentValues = [];
    let firstAppointmentDate = null;
    let lastAppointmentDate = null;
    let serviceCountMap = {};
    let serviceRevenueMap = {};
    let customerCountMap = {};
    let employeeCountMap = {};

    for (const apt of appointments) {
      // Get price from business.serviceCategories
      let serviceId = apt.service?.toString();
      let price = 0;
      if (serviceId) {
        const matchedService = business.serviceCategories.find(
          s => s._id?.toString() === serviceId
        );
        price = matchedService?.price || 0;
      }
      // Revenue: sum price for completed appointments
      if (apt.status === "completed") {
        totalRevenue += price;
        completedAppointments++;
        appointmentValues.push(price);
      }
      if (apt.status === "cancelled") cancelledAppointments++;
      if (apt.status === "no-show") noShowAppointments++;
      // First/last appointment
      const created = new Date(apt.createdAt);
      if (!firstAppointmentDate || created < firstAppointmentDate) firstAppointmentDate = created;
      if (!lastAppointmentDate || created > lastAppointmentDate) lastAppointmentDate = created;
      // Service stats
      if (serviceId) {
        serviceCountMap[serviceId] = (serviceCountMap[serviceId] || 0) + 1;
        serviceRevenueMap[serviceId] = (serviceRevenueMap[serviceId] || 0) + price;
      }
      // Customer stats
      const email = apt.customer?.email;
      if (email) {
        if (!customerCountMap[email]) customerCountMap[email] = { appointments: 0, revenue: 0 };
        customerCountMap[email].appointments++;
        customerCountMap[email].revenue += price;
      }
      // Employee stats
      const staffId = apt.staff?.toString();
      if (staffId) {
        employeeCountMap[staffId] = (employeeCountMap[staffId] || 0) + 1;
      }
    }

    // Average appointment value
    const averageAppointmentValue = appointmentValues.length > 0 ? (appointmentValues.reduce((a, b) => a + b, 0) / appointmentValues.length) : 0;

    // Most popular service
    let mostPopularService = null;
    if (Object.keys(serviceCountMap).length > 0) {
      const topServiceId = Object.keys(serviceCountMap).reduce((a, b) => serviceCountMap[a] > serviceCountMap[b] ? a : b);
      const matchedService = business.serviceCategories.find(s => s._id?.toString() === topServiceId);
      mostPopularService = matchedService ? {
        name: matchedService.title,
        count: serviceCountMap[topServiceId],
        revenue: serviceRevenueMap[topServiceId] || 0
      } : null;
    }

    // Total services
    const totalServices = business.serviceCategories.length;

    // Total customers
    const totalCustomers = Object.keys(customerCountMap).length;

    // Top customer
    let topCustomer = null;
    if (Object.keys(customerCountMap).length > 0) {
      const topEmail = Object.keys(customerCountMap).reduce((a, b) => customerCountMap[a].revenue > customerCountMap[b].revenue ? a : b);
      topCustomer = {
        email: topEmail,
        appointments: customerCountMap[topEmail].appointments,
        revenue: customerCountMap[topEmail].revenue
      };
    }

    // Repeat customer rate
    const repeatCustomers = Object.values(customerCountMap).filter(c => c.appointments > 1).length;
    const repeatCustomerRate = totalCustomers > 0 ? repeatCustomers / totalCustomers : 0;

    // Reviews
    const reviews = await Review.find({ forBusiness: businessId }).sort({ createdAt: -1 });
    const totalReviews = reviews.length;
    const averageReviewRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / totalReviews) : 0;
    const recentReview = totalReviews > 0 ? {
      text: reviews[0].text,
      rating: reviews[0].stars,
      date: reviews[0].createdAt
    } : null;

    // Employees
    const totalEmployees = business.employees.length;
    let topEmployee = null;
    if (Object.keys(employeeCountMap).length > 0) {
      const topStaffId = Object.keys(employeeCountMap).reduce((a, b) => employeeCountMap[a] > employeeCountMap[b] ? a : b);
      const empDoc = await Employee.findById(topStaffId);
      topEmployee = empDoc ? {
        name: empDoc.name,
        appointments: employeeCountMap[topStaffId]
      } : null;
    }

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalAppointments,
        completedAppointments,
        cancelledAppointments,
        noShowAppointments,
        averageAppointmentValue,
        firstAppointmentDate,
        lastAppointmentDate,
        mostPopularService,
        totalServices,
        totalCustomers,
        topCustomer,
        repeatCustomerRate,
        averageReviewRating,
        totalReviews,
        recentReview,
        totalEmployees,
        topEmployee
      }
    });
  } catch (err) {
    console.error("Error fetching business analytics:", err);
    next(err);
  }
};

module.exports = {
  createAppointment,
  getAppointmentsForBusiness,
  getTotalBookings,
  getMonthlyRevenue,
  getTodaysAppointments,
  getRecentBookings,
  getAppointmentsForCustomer,
  getAppointmentsForUser,
  updateAppointmentStatus,
  getTodaysRevenue,
  getTodaysBookingsCount,
  getTotalCustomers,
  getCompletedAppointmentsForUser,
  getCompletedAppointmentsForCustomerByEmail,
  getAverageRating,
  getCustomerSatisfaction,
  getCustomerVisitHistory,
  getTopCustomers,
  createAppointmentByBusiness,
  getBookedTimesForEmployee,
  getBusinessAnalytics,
  checkAvailability
};
