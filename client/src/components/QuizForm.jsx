import { useState, useRef } from 'react';
import useQuizStore from '../stores/quizStore';
import axios from '../api/axios';

const QuizForm = () => {
  const { userInfo, questions, answers, setAnswer, setResult, setStep } = useQuizStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const questionRefs = useRef([]);

  const handleAnswerChange = (questionId, choice) => {
    setAnswer(questionId, choice);
    setWarning('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all questions are answered
    if (answers.length !== questions.length) {
      const unansweredIndex = questions.findIndex(
        q => !answers.some(a => a.questionId === q._id)
      );
      
      if (unansweredIndex >= 0 && questionRefs.current[unansweredIndex]) {
        questionRefs.current[unansweredIndex].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      
      setWarning(`Please answer all ${questions.length} questions before submitting`);
      return;
    }

    setWarning('');
    setError('');
    setLoading(true);

    try {
      // Build payload
      const payload = {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        answers: answers
      };

      // Submit to API
      const response = await axios.post('/api/results', payload);
      
      // Save result and move to result step
      setResult(response.data);
      setStep('result');
    } catch (err) {
      setError('Failed to submit results, please try again');
      console.error('Error submitting results:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedChoice = (questionId) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.choice;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Quiz Questions</h1>
        <p className="text-gray-600 mb-8 text-center">
          Answer all {questions.length} questions by selecting option A or B
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div 
              key={question._id} 
              ref={(el) => (questionRefs.current[index] = el)}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <h3 className="text-lg font-semibold mb-4">
                Question {index + 1}: {question.text}
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value="A"
                    checked={getSelectedChoice(question._id) === 'A'}
                    onChange={() => handleAnswerChange(question._id, 'A')}
                    className="mt-1"
                  />
                  <span className="flex-1">
                    {question.optionA}
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value="B"
                    checked={getSelectedChoice(question._id) === 'B'}
                    onChange={() => handleAnswerChange(question._id, 'B')}
                    className="mt-1"
                  />
                  <span className="flex-1">
                     {question.optionB}
                  </span>
                </label>
              </div>
            </div>
          ))}

          {warning && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
              {warning}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
