import express from 'express';
import mongoose from 'mongoose';
import Question from '../models/Question.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/questions/random - Public route
router.get('/random', async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 10 } }
    ]);
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/questions - Protected route
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/questions - Protected route
router.post('/', auth, async (req, res) => {
  try {
    const { text, optionA, optionB } = req.body;

    // Validate input
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Question text is required' });
    }
    if (!optionA || !optionA.trim()) {
      return res.status(400).json({ error: 'Option A is required' });
    }
    if (!optionB || !optionB.trim()) {
      return res.status(400).json({ error: 'Option B is required' });
    }

    const question = new Question({
      text,
      optionA,
      optionB
    });

    await question.save();
    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/questions/:id - Protected route
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid question ID' });
    }

    const question = await Question.findByIdAndDelete(req.params.id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    return res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
