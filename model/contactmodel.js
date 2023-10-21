const mongoose = require('mongoose');

const contactScheme = mongoose.Schema(
    {
        salutation: {
            type: String,
            required: [true, "Kindly add salutation"]
        },
        firstName: {
            type: String,
            required: [true, "Kindly add first name"]
        },
        secondName: {
            type: String,
            required: [true, "Kindly add second name"]
        },
        phone: {
            type: Number,
            required: [true, "Kindly add phone"]
        },
        gender: {
            type: String,
            required: [true, "Kindly add gender"]
        },
        mail: {
            type: String,
            required: [true, "Kindly add email"]
        },
        image:{
            path:String
        }
    },
    {
        timestamps:true
    }

)
module.exports = mongoose.model("Contact",contactScheme)



