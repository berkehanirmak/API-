const express = require("express");
const corse = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database.js");
const Auth= require("./routes/auth.js");
const Post= require("./routes/post.js");

dotenv.config();

const app = express();
const PORT =process.env.PORT || 5000;

app.use(express.json());
app.use(corse());
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use("/",Auth)
app.use("/",Post)

app.get("/", (req, res) => {
    res.json({
        message: "Connceted"});
});

connectDB();

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})
