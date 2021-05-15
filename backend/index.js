// index.js
// contains the server

const express = require("express");  // import express
// cors allows for easy frontend and backend communication
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

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
	useUnifiedTopology: true
    })
    .then(() => {
	console.log("Connected to database");
    })
    .catch(err => {
	console.log("Could not connect to database", err);
	process.exit();
});


// root endpoint
app.get("/", (req, res) => {
    res.json({message: "Welcome to bSports." });
});

app.get("/api", (req, res) => {
    res.json({message: "Hello from server!" });
});

require("./routes/eventRoutes.js")(app);

// set up the port to listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(bodyParser);
});

