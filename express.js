import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require("express");
import {User, Institution, Book} from "./index.js";
import mongoose from "./index.js";

const app = express();
const port = 5000;



let validatedUser = false;
let userInstitution;

app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.listen(port, ()=>{console.log("You've connected!")});

app.get("/books", async (req,res)=>{
    if(validatedUser)
    {
        let books = await Book.find({Institution:userInstitution});
        res.send(books);
    }
})

app.post("/users/signin", async function(req,res)
{
    const user = await User.findOne({Name:req.body.name, Password: req.body.password});
    if(!user)
    {
        res.send("User does not exist!");
    }
    else
    {
        validatedUser = true;
        userInstitution = user.Institution;
        res.send("User signed in successfully!")
    }
})


app.post("/users/create", async (req,res) => 
{

    let domain = req.body.email.split("@");
    let validatedDomain = await Institution.findOne({Domain: domain[1]});

    if(validatedDomain)
    {
        User.create({
            Name: req.body.name,
            Email: req.body.email,
            Role: req.body.role,
            Password: req.body.password,
            Institution: req.body.institution
         })
    }
    else
    {
        console.log("Domain does not match an institution");
    }
})

