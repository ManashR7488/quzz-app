import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    choice: {
      type: String,
      enum: ['A', 'B']
    }
  }],
  aCount: {
    type: Number,
    required: true
  },
  bCount: {
    type: Number,
    required: true
  },
  aPercentage: {
    type: Number,
    required: true
  },
  bPercentage: {
    type: Number,
    required: true
  },
  style: {
    type: String,
    enum: ['A', 'B'],
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;
