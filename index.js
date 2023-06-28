import mongoose from "mongoose";
import { Schema, model } from "mongoose";


mongoose.connect("mongodb+srv://Ryan:bkpX0iqrmHzx1FW7@users.ri0aenc.mongodb.net/");


const userSchema = new Schema({
    Name: String,
    Email: String,
    Role: String,
    Password: String,
    Institution: String 
})


const institutionSchema = new Schema({
    Name: String,
    URL: String, 
    Domain: {type:String, required:true}
})

const bookSchema = new Schema({
    ISBN: Number,
    Title: String,
    Author: String,
    Institution: String
})


export const User = model("User", userSchema);
export const Institution = model("Institution", institutionSchema);
export const Book = model("Book", bookSchema);
export  default mongoose;

const userOne = await User.create(
    {
        Name: "Gabrielle Charlebois",
        Email: "harleybikes_rule@hotmail.com",
        Role:"Administrator",
        Password:"12345",
        Institution:"Ports"
    }
);

const portOne = await Institution.create(
    {
        Name:"Ports",
        URL:"www.ports.com",
        Domain:"@ports.com"
    }
)