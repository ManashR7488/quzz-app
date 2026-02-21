import express from 'express';
import Result from '../models/Result.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/results - Public route
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, answers } = req.body;

    // Validate inputs
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone is required' });
    }
    if (!Array.isArray(answers) || answers.length !== 10) {
      return res.status(400).json({ error: 'Answers must be an array of exactly 10 items' });
    }

    // Validate each answer
    for (const answer of answers) {
      if (!answer || typeof answer !== 'object') {
        return res.status(400).json({ error: 'Each answer must be a valid object' });
      }
      if (!answer.choice || (answer.choice !== 'A' && answer.choice !== 'B')) {
        return res.status(400).json({ error: 'Each answer must have a choice of "A" or "B"' });
      }
    }

    // Compute statistics
    const aCount = answers.filter(a => a.choice === 'A').length;
    const bCount = answers.filter(a => a.choice === 'B').length;
    const aPercentage = Math.round((aCount / 10) * 100);
    const bPercentage = Math.round((bCount / 10) * 100);
    const style = aCount >= bCount ? 'A' : 'B';

    // Create and save result
    const result = new Result({
      name,
      email,
      phone,
      answers,
      aCount,
      bCount,
      aPercentage,
      bPercentage,
      style
    });

    await result.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/results - Protected route
router.get('/', auth, async (req, res) => {
  try {
    const results = await Result.find().sort({ submittedAt: -1 });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
