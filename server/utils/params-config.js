const { v4: uuidv4 } = require('uuid')

const params = fileName => {
  const myFile = fileName.originalname.split('.')
  // grab last element of the above array...ie the file extension
  const fileType = myFile[myFile.length - 1]

  const imageParams = {
    Bucket: 'user-images-4c41d0fa-ae8a-4a97-aca4-26a4b6d05254',
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: 'public-read' // allow read access to this file
  }

  return imageParams
}

module.exports = params