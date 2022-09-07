const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// mongoose.connect('mongodb://localhost:27017/test').
//   catch(error => handleError(error));

// mongoose.connect(uri, options, function(error) {
//     // Check error in initial connection. There is no 2nd param to the callback.
//   });

// mongoose.connection.on('error', err => {
//     logError(err);
//   });

// try {
//     await mongoose.connect('mongodb://localhost:27017/test');
//         } catch (error) {
//     handleError(error);
//     }

//ask for help from learning assistants to check if this is the correct set up
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/potential-memory', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`Now on localhost:${PORT}`));