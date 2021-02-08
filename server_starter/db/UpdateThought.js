const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient()

const table = "Users";

const username = "Kip.Buckridge";
const email = "Kip.Buckridge@email.com";

// Update the item, unconditionally,

const params = {
    TableName:table,
    Key:{
        "username": username,
        "email": email
    },
    UpdateExpression: "REMOVE thoughts = :t",
    ExpressionAttributeValues:{
        ":t":"Orci phasellus egestas tellus rutrum tellus pellentesque."
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});