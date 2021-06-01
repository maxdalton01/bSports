// index.js
// contains the server
const express = require("express");  // import express
// cors allows for easy frontend and backend communication
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require('passport');
const home = require('./routes/userRoutes.js')

const app = express();

app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    origin: "http://localhost:3000" // origin is the homepage
}));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }));

// set up database connection
const db = require("./models");
db.mongoose
    .connect(db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => {
	console.log("Connected to database");
    })
    .catch(err => {
	console.log("Could not connect to database", err);
	process.exit();
});



app.use('/api', home);                             // /api/ leads to our home page with routes defined in userRoutes.js
/*app.get("/api", (req, res) => {
    res.json({message: "Hello from server!" });
});*/

require("./routes/eventRoutes.js")(app);
require("./routes/faqRoutes.js")(app);

// set up the port to listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(bodyParser);
});

