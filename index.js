



// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
//  const formRoutes = require('./routes/form');

//  const app = express();
//  require("dotenv").config();

//  const corsOptions = {
//     credentials: true,
//     origin: process.env.FRONT_END_URL, // Ensure this matches your frontend URL
//   };

//   app.options('*', cors(corsOptions));

  
// //   app.use(cors(corsOptions));
//  app.use(cookieParser());
// app.use(express.json());

// // mongoose.connect('mongodb://localhost:27017/formbuilder', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useFindAndModify: false,
// // });

// // app.get('/', (req, res) => {
// //     res.send('Server is up and running');
// //   });

//  const adminRoute = require('./routes/adminRoute')
//  app.use('/api/admin', adminRoute)
   
// //   app.use('/api', formRoutes);

// const dbUrl = process.env.MONGO_URI;
// mongoose.connect(dbUrl, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to the database");
//     const port = process.env.PORT || 3000;
//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     });
// }).catch(error => {
//     console.error("Error connecting to the database:", error);
// });

// app.options('*', cors(corsOptions));


const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formRoutes = require('./routes/form'); // Adjust if needed
const adminRoute = require('./routes/adminRoute'); // Adjust if needed

const app = express();
require('dotenv').config();

// Configure CORS
// const corsOptions = {
//     origin: 'http://localhost:5173', // Ensure this matches your frontend URL
//     credentials: true,
//   };
// app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add both allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  credentials: true, // If you are using cookies or credentials
}));

// Middleware
app.use(cookieParser());
app.use(express.json());



// Routes
app.use('/admin', adminRoute);  // Ensure this route is correct
app.use('/forms', formRoutes); // Ensure this route is correct

// Database Connection
const dbUrl = process.env.MONGO_URI;
mongoose.connect(dbUrl, {
 
})
  .then(() => {
    console.log("Connected to the database");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route working');
  });