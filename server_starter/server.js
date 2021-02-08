const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fileRoutes = require('./routes/file-upload');
const userRoutes = require('./routes/user-routes');

// express middleware, used to be bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// app.use(require('./routes'));
app.use('/api/', fileRoutes);
app.use('/api/', userRoutes);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);


// const express = require('express');
// const path = require('path');
// // const config = require('../config/config');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // API routes
// require('./routes')(app);

// // Serve up static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
// }

// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}!`);
// });
