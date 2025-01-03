import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db.js";
import user from "./models/user.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();



app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

connectDB();


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,POST,PUT,DELETE',
    credentials: true,
};


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.post('/verify', (req, res) => {
    const { fname, lname, email } = req.body

    if (!fname || !lname || !email) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const newUser = new user({
        fname,
        lname,
        email
    })

    newUser.save().then(() => {
        res.status(201).json({ message: "User created successfully" })
    }).catch((e) => {
        console.log(e)
        res.status(500).json({ message: "User creation failed" })
    })

})

app.listen(3000, () => {
    console.log(`Example app listening on port http://localhost:${3000}`);
});