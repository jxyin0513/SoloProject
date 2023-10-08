require('dotenv').config()
const S3 = require('aws-sdk/clients/s3');

const NAME_OF_BUCKET = process.env.aws_bucket_name
const region = process.env.aws_bucket_region
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
})

const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
      Bucket: NAME_OF_BUCKET,
      Key,
      Body: buffer,
      ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();

    // save the name of the file in your bucket as the key in your database to retrieve for later
    return result.Location;
  };

  // in awsS3.js
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, "");
    },
  });

  // in awsS3.js
  const singleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).single(nameOfKey);

// function uploadFile(file){
//     const fileStream = fs.createReadStream(file.path)

//     const uploadParams = {
//         Bucket: bucketName,
//         Body:fileStream,
//         key: file.filename
//     }

//     return s3.upload(uploadParams).promise()
// }
module.exports = {singlePublicFileUpload, singleMulterUpload}
