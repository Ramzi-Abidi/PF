const express = require("express");


const cors = require("cors");
const data = require("./data");
const mongoose = require("mongoose");
const User = require("./userModel");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Book = require("./bookModel");

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = "mongodb+srv://Ramzi:Gazert7890@cluster0.tw1bp.mongodb.net/PROJET-FEDERE?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db successfully");
});

//adding products to the db .
/* app.get("/seed", async(req, res) => {
    
}); */

/* console.log(data.books); */
app.get("/books", async (req, res) => {
    //await Book.remove({});

    const createdBooks = await Book.insertMany(data.books);
    console.log(createdBooks);
    
    //res.send(createdBooks);
    res.send(createdBooks);
});

app.post("/signup", expressAsyncHandler(async (req, res) => {

    console.log(req.body);

    //The findOne() function is used to find one document according to the condition.
    //If multiple documents match the condition, then it returns the first document satisfying the condition.
    let existedUser = await User.findOne({
        email: req.body.email,
    });
    console.log(existedUser);

    //user already existed :/
    if (existedUser) {
        res.status(401).json({ message: "duplicate user", type: "ERROR" });
        throw new Error("duplicated user");
    }

    //user doesn't exist :)
    else {
        let newUser = new User({            //we created a new user (using the model "User")
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),    //hashing the password
        });
        const createdUser = await newUser.save(); //saving doc to the db

        res.json({      //.json() to convert the response to a string then send it back to the client .
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
        });
    }
}));

app.post("/signin", expressAsyncHandler(async (req, res) => {
    console.log(req.body);

    let existedUser = await User.findOne({
        email: req.body.email,
    });

    if (existedUser) {
        if (bcrypt.compareSync(req.body.password, existedUser.password)) {
            res.json({
                _id: existedUser._id,
                name: existedUser.name,
                email: existedUser.email,
                isAdmin: existedUser.isAdmin,
            });
            return;
        }
        else {
            res.status(401).json({ message: "invalid email or password", type: "ERROR" });
        }
    }
    else
        res.status(401).json({ message: "invalid email or password", type: "ERROR" });
    //user doesn't exist :)
    /*     else {
            let newUser = new User({            //we created a new user (using the model "User")
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),    //hashing the password
            });
            const createdUser = await newUser.save(); //saving doc to the db
    
            res.json({      //.json() to convert the response to a string then send it back to the client .
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                password: createdUser.password,
            });
        } */
}));

app.get("/", (req, res) => {
    res.send("home route");
});

app.listen(5000, () => {
    console.log("server is running on server 5000");
});