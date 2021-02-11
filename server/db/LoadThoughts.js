const AWS = require('aws-sdk')
// file system package to read user.json data
const fs = require('fs')

AWS.config.update({
  region: 'us-east-2',
  // for development on local dynamodb instance
  endpoint: 'http://localhost:8000'
})
//  because we're using the DocumentClient() class to instantiate the service object, dynamodb, the request and response from the database are native JavaScript objects. This greatly simplifies the code and improves the developer experience by sidestepping any impedance mismatch.
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})



console.log('Importing thoughts into DynamoDB.  Please wait')
// need to execute from root directory
const allUsers = JSON.parse(fs.readFileSync('./server/seed/user.json', 'utf8'))

allUsers.forEach(user => {
  const params = {
    TableName: 'Thoughts',
    Item: {
      'username': user.username,
      'createdAt': user.createdAt,
      'thought': user.thought
    }
  }
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add thought', user.username, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', user.username);
    }
  })
})



