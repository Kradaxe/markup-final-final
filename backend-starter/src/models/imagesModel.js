const mongoose  = require("mongoose");

const imagesModel = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
  workspace_id: {
    type: String,
  },
  uploader_id: {
    type:String,
  },
},{
  timestamps:true
});

module.exports=mongoose.model('Images',imagesModel);