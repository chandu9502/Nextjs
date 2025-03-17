const { default: mongoose } = require("mongoose");


const MobileModel = new mongoose.Schema({
    title : {
        type : String
    },
    brand : {
        type : String
    },
    price : {
        type : Number
    }
})
const MobileSchema = mongoose.models.mobilemodel || mongoose.model('mobilemodel',MobileModel);
export default MobileSchema;