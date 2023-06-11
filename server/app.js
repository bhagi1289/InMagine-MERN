const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var compression = require("compression");

require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");



const mongdb = require("./mongodb/mongodb.connect");
const Admin = require("./services/admin");
const authRoutes = require("./routes/auth");
const tableRoutes = require("./routes/tables");
const configRoutes = require("./routes/restaurantConfig");
const queueRoutes = require("./routes/queue");

const passport = require("./passport/setup");

const { SECRET } = process.env;

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

mongdb.connect();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://*.onrender.com'); // Replace with your client's domain
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Set-Cookie', 'cookieName=cookieValue; Secure; SameSite=None');

  next();
});

const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(session({
  secret: SECRET,
  resave: false,
  expires: new Date(Date.now() + 60),
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));




const admin = Admin.getInst();
admin.createAdmin({email:"admin@restaurant.com", password:"Welcome@9821"});

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",authRoutes);
app.use("/tables", tableRoutes);
app.use("/config", configRoutes);
app.use("/queue", queueRoutes);



app.use((error, req, res, next) => {
  // console.log(error);
  res.status(500).json({ message: error.message });
});
app.get("/", (req, res) => {
  res.json("Hello World!!");
});

module.exports = app;