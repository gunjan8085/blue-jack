const express = require("express");
// const router = express.Router();
const router = require("express").Router();


const serviceController = require('../controllers/services.controller');


router.post("/create", serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);
router.get('/services/company/:companyId', serviceController.getServicesByCompany);
router.get('/services/search', serviceController.searchServices);
router.get('/services/stats', serviceController.getServiceStats);

module.exports = router;
