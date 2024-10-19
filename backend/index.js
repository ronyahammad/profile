require("dotenv").config({ path: "./config.env" });
const express = require('express');
const app = express();
app.use(express.json())
//cors enabled
const cors = require('cors')
const connectDB = require("./Config/db");

const cookieParser = require('cookie-parser')

const options = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both ports
};
app.use(cors(options));
app.use(cookieParser())


connectDB();

app.get('/', (req, res) => {
    res.send("Api running. What more do you expect?");
});

//api access
app.use("/api/auth", require("./Routes/auth"));
app.use("/api", require("./Routes/user"));
app.use('/api/upload', require('./Routes/upload'))
app.use("/api/articles", require("./Routes/post"));
app.use("/api/comments", require("./Routes/comment"));
app.use("/api/infos", require("./Routes/infos"));
app.use("/api/apiinfo", require("./Routes/apiInfo"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))
})
