const express = require('express');
const router = require('./routes/v1');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const connectPassport = require('./utils/passport');
const connectSocket = require('./utils/socket.io');

const swaggerDocument = YAML.load('./apidocs.yaml');

connectDB();
connectSocket()

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(require('express-session')({ secret: 'dfgnodfgjdpo4905terkldfndlndlkn', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(session({
    secret: "ffmgprfmgrpfmofgffghf",
    resave: true,
    saveUninitialized: true
}));

// app.use(session({
//     secret: process.env.FACEBOOK_SECRET,
//     resave: true,
//     saveUninitialized: true
// }));

app.use(passport.initialize());
app.use(passport.session());

// Connect Passport strategies
connectPassport();

// Routes
app.use("/api/v1", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})