const mongoose  = require("mongoose");

const commentModel = new mongoose.Schema({
  post_id: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  user_id: {
    type:mongoose.Types.ObjectId,
    ref: "User"
  }
},{
  timestamps:true
});

module.exports=mongoose.model('Comment',commentModel);