const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Users";

const username = "Kip.Buckridge";
const email = "Kip.Buckridge@email.com";

const params = {
    TableName: table,
    Key: {
        "username": username,
        "email": email
    },
    UpdateExpression: "SET #T = list_append(#T, :th)",
    ExpressionAttributeNames: {
        "#T": "thoughts"
    },
    ExpressionAttributeValues: {
        ":th": [
            "Worci phasellus egestas tellus rutrum tellus pellentesque."
        ]
    }
};

docClient.update(params, (err, data) => {
    if (err) {
        console.error("Unable to append item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("AppendItem succeeded:", JSON.stringify(data, null, 2));
    }
});

