const path = require("path");
const express = require("express");
const compression = require("compression");
require('dotenv').config()
const app = express();
const HTML_FILE = path.join(__dirname, "build/index.html");
const PORT = process.env.REACT_APP_PORT;

if (!PORT) {
    console.log('PORT is undefined, exiting ...');
    process.exit(1);
}

app.use(compression());
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}...`);
    console.log("Press Crl+C to quit.");
});