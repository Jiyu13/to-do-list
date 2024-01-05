const express = require("express")
const app = express()
const cors = require("cors")
const listsRoutes = require('./routes/lists')

const connectDB = require("./db/connect")
require('dotenv').config()


// middleware
app.use(cors());
app.use(express.json())     // - express.json() middleware, in order to use the 'req.body'


// routes
// app.get('/', (req, res) => {res.send("Task Manage Appz")})
app.use('/api/v1/to_do_list', listsRoutes)




const port = process.env.PORT || 3000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();