const express = require('express')
const router = express.Router()
const multer = require('multer')
const AWS = require('aws-sdk')
const paramsConfig = require('../utils/params-config')

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '')
  }
})

// use the package multer to provide the middleware for handling multipart/form-data, primarily used for uploading files. The multer package will add a file property on the req object that contains the image file uploaded by the form
// image is the key
const upload = multer({storage}).single('image')

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

//  the upload function as the second argument to define the key and storage destination.
router.post('/image-upload', upload, (req, res) => {
  // set up params config
  const params = paramsConfig(req.file)
  // set up s3 service call
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    console.log('Success', data.Location);
    res.json(data)
  })
})

module.exports = router