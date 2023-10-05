require('dotenv').config()
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.aws_bucket_name
const region = process.env.aws_bucket_region
const accessKeyId = process.env.aws_access_key_id
const secretAccessKey = process.env.aws_secret_access_key

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body:fileStream,
        key: file.filename
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile
