const express = require('express');
const router = express.Router();
const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
  endpoint: "http://localhost:8000",

};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";

// get all users' thoughts
router.get('/users', (req, res) => {
  const params = {
    TableName: table
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // an error occurred
    } else {
      res.json(data.Items)
    }
  });
})

// get thoughts from a user
router.get('/users/:username', (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought"
    },
    ExpressionAttributeValues: {
      ":user": req.params.username
    },
    ProjectionExpression: "#th, #ca"
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Query succeeded.");
      res.json(data.Items)
    }
  });
});

// Create new user
router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      "username": req.body.username,
      "createdAt": Date.now(),
      "thought": req.body.thought
    }
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Added item:", JSON.stringify(data));
      res.json({ "Added": JSON.stringify(data, null, 2) });
    }
  });
});
// // Create new user
// router.get('/create', (req, res) => {
//   const params = {
//     TableName: table,
//     Item: {
//       "username": "Carol Dweck",
//       "createdAt": 1602018401105,
//       "thought": "You can suffer the pain of change or suffer remaining the way you are."
//     }
//   };
//   // const params = {
//   //   TableName: table,
//   //   Item: {
//   //     "username": req.body.username,
//   //     "createdAt": Date.now(),
//   //     "thought": req.body.text
//   //   }
//   // };
//   dynamodb.put(params, (err, data) => {
//     if (err) {
//       console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//       console.log("Added item:", JSON.stringify(data, null, 2));
//     }
//   });
// });

// Destroy
router.delete('/users/:time/:username', (req, res) => {

  const username = "Ray Davis"
  const time = 1602466687289;
  const thought = "Tolerance only for those who agree with you is no tolerance at all.";

  const params = {
    TableName: table,
    Key: {
      "username": username,
      "createdAt": time,
    },
    KeyConditionExpression: "#ca = :time",
    ExpressionAttributeNames: {
      "#ca": "createdAt"
    },
    ExpressionAttributeValues: {
      ":time": time,
    }
  }

  console.log("Attempting a conditional delete...");
  dynamodb.delete(params, (err, data) => {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
});

// // update
// router.put('/users/:username', (req, res) => {
//   res.json({ "which": "which" })
// });
  // const { time, username } = req.params;

//   var table = "Movies";

// var year = 2015;
// var title = "The Big New Movie";

// var params = {
//     TableName:table,
//     Key:{
//         "year": year,
//         "title": title
//     },
//     ConditionExpression:"info.rating <= :val",
//     ExpressionAttributeValues: {
//         ":val": 5.0
//     }
// };
module.exports = router;
