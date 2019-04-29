let express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    cors = require('cors'),
    constants = require('./utils/constants'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

let participantRoutes = require('./routes/participant');
let adminRoutes = require('./routes/admin');


mongoose.connect(constants.mongodbUrl);
app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(methodOverride("_method"));


////////////////////////---------------------------------------------  USER ROUTES -----------------------------------------------/////////////////////////

app.use('/participant', participantRoutes);
app.use('/admin' , adminRoutes);


const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Supplychain Server listening on ${port}`);

module.exports.app = app;