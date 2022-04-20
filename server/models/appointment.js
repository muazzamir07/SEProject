const mongoose=require('mongoose'),
Schema = mongoose.Schema;



const appointmentSchema=new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    workshopName:{
        type: String,
        required: true
    },

    time:{
        type: String,
        required: true
    },

    user:{ type: Schema.Types.ObjectId, ref: 'USER' },


})

const Appointment= mongoose.model('Appointment',appointmentSchema);

module.exports= Appointment;