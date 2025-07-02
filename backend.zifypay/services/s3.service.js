const AWS = require('aws-sdk');

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME } = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !AWS_BUCKET_NAME) {
  throw new Error('Missing AWS environment variables.');
}

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

console.log('✅ AWS S3 Service Initialized');
console.log(`ℹ️ Region: ${AWS_REGION}, Bucket: ${AWS_BUCKET_NAME}`);

const s3 = new AWS.S3();

const uploadFile = async (file) => {
  try {
    if (!file || !file.buffer || !file.originalname) {
      throw new Error('Invalid file object passed to uploadFile.');
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(uploadParams).promise();

    console.log('✅ File uploaded successfully:', result.Location);
    return result;
  } catch (error) {
    console.error('❌ Error uploading file to S3:', error.message);
    return null;
  }
};

const deleteFile = async (fileUrl) => {
  try {
    const fileKey = fileUrl.split('/').pop(); // Extract filename from URL
    const deleteParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.deleteObject(deleteParams).promise();
    console.log("🗑️ Resume deleted from S3:", fileKey);
  } catch (err) {
    console.error("❌ Error deleting file from S3:", err.message);
  }
};

module.exports = { uploadFile, deleteFile };