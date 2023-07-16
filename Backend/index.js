const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config")
const routes = require('./routes/index')
const cors = require('cors')
const { jwtStrategy } = require("./config/passport");

const passport = require("passport");

app.use(cors({origin:true,
credentials:true}));
app.options("*", cors());
app.use(express.json());
app.use(passport.initialize());
passport.use("jwt" , jwtStrategy);
app.use('/' , routes)

mongoose
  .connect(
   config.mongoose.url,
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
  .then(() => {
    console.log("Login successful");
  })
  .catch((err) => {
    console.log(err);
  });
  

app.listen(config.port, () => {
  console.log("listening on port", config.port);
});
