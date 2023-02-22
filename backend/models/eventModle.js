const mongoose=require("mongoose")

const eventSchema=new mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

    title:{
        type:String,
        required:[true,'Please enter Your Nmane'],
        maxlength:[20,"can not exceed 30 character"],
        minlength:[2,"can not exceed 4 character"]
    },
    type:{
        type:String,
            required:[true,"Please Select Your EventType"],
            default:"public"
    },

    startDate:{
        type:Date,
        required:[true,"Please add date"],
        default:Date.now(),
    },
    endDate:{
        type:Date,
        required:[true,"Please add date"],
        default:Date.now(),
    },
})

module.exports = mongoose.model("Event",eventSchema)