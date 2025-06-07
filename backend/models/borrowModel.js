import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnedAt: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 0,
  },
  finePayed :{
    type:Boolean,
    default :false
  }
}, { timestamps: true });

export default mongoose.model('Borrow', borrowSchema);
