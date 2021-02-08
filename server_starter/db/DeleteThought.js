const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
  accessKeyId: 'xxxx',
  secretAccessKey: 'xxxx'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Thoughts";

const username = "Carol Dweck";
const createdAt = 1602008477627;

const params = {
  TableName: table,
  Key: {
    "username": username,
    "createdAt": createdAt
  },
  ConditionExpression: "username = :u",
  ExpressionAttributeValues: {
    ":u": username
  }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
  if (err) {
    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  }
});