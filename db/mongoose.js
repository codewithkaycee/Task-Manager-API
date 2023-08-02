const mongoose = require('mongoose');


mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},).then(() => {
    console.log("Successfully Connected to the database");
  }).catch(error => {
     console.log("Database Connection failed:", error.message);
   });