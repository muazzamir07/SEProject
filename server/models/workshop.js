const mongoose=require('mongoose'),
Schema = mongoose.Schema;



const workshopSchema=new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    user:{ type: Schema.Types.ObjectId, ref: 'USER' },


})

const Workshop= mongoose.model('WORKSHOP',workshopSchema);

module.exports= Workshop;