import mongoose from  'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type:Boolean,
    default : false
  },
  borrowedBooks: [{
     type: mongoose.Schema.Types.ObjectId, ref: 'Borrow'
  }]

});

export default mongoose.model('User', userSchema);
