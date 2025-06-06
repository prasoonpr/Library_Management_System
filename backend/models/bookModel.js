const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  author: {
    type: String,
    required: true,
    trim: true,
  },

  genre: {
    type: String,
    trim: true,
  },

  quantity :{
    type : Number,
    required : true
  },

  available: {
    type: Number,
    required:true
 },

  publishedDate: {
    type: Date,
  },

  description: {
    type: String,
  },

//   coverImage: {
//     type: String, 
//   },
},
 { timestamps: true });

export default mongoose.model('Book', bookSchema);