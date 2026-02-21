import useQuizStore from '../stores/quizStore';

const ResultPage = () => {
  const { result, reset } = useQuizStore();

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No results available</p>
      </div>
    );
  }

  const styleLabel = result.style === 'A' 
    ? 'Analytical / Left-style' 
    : 'Experiential / Right-style';

  // Determine A description based on aPercentage
  const aDescription = result.aPercentage <= 50
    ? 'You do not depend much on fixed plans or step-by-step methods. You usually handle situations in a flexible way and adjust as things happen. You can use logic when needed, but it is not your natural first choice. You are comfortable understanding things through experience rather than strict structure.'
    : 'You naturally like order and clear steps. Before doing something, you prefer to understand the method or plan. You feel more comfortable when things are organized and predictable. You usually think carefully and logically before taking action.';

  // Determine B description based on bPercentage
  const bDescription = result.bPercentage <= 50
    ? 'You do not rely much on intuition or guesswork. You prefer clear explanations and reasoning before deciding anything. You may adjust when needed, but you usually trust logic more than feelings or impressions.'
    : 'You usually understand things through experience and overall sense. Instead of strict rules, you adjust naturally according to the situation. You often trust your understanding of the situation and respond in a flexible way rather than following fixed steps.';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Your Results</h1>
        <p className="text-gray-600 mb-8 text-center">
          Thank you for completing the quiz!
        </p>

        {/* Style Heading */}
        <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-blue-800">
            Your Style: {styleLabel}
          </h2>
        </div>

        {/* Statistics Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Breakdown:</h3>
          
          {/* Option A Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">
                (Analytical)
              </span>
              <span className="font-bold text-blue-600">
                {result.aPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-blue-600 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${result.aPercentage}%` }}
              >
                {result.aPercentage > 10 && (
                  <span className="text-white font-semibold text-sm">
                    {result.aCount}/10
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Option B Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">
                (Experiential)
              </span>
              <span className="font-bold text-green-600">
                {result.bPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-green-600 h-8 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${result.bPercentage}%` }}
              >
                {result.bPercentage > 10 && (
                  <span className="text-white font-semibold text-sm">
                    {result.bCount}/10
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description Boxes */}
        <div className="space-y-4 mb-8">
          {/* A Description Box */}
          <div className="p-6 rounded-lg border-2 border-indigo-200 bg-indigo-50">
            <h3 className="text-lg font-semibold mb-3 text-indigo-800">
             Analytical / Left-style
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {aDescription}
            </p>
          </div>

          {/* B Description Box */}
          <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50">
            <h3 className="text-lg font-semibold mb-3 text-green-800">
              Experiential / Right-style
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {bDescription}
            </p>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-2">Summary</h3>
          <p className="text-gray-700">
            You answered <strong>{result.aCount}</strong> questions as <strong>A</strong> ({result.aPercentage}%)
            and <strong>{result.bCount}</strong> questions as <strong>B</strong> ({result.bPercentage}%).
          </p>
          <p className="text-gray-700 mt-2">
            Your dominant style is <strong>{result.style}</strong>.
          </p>
        </div>

        {/* Retake Button */}
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
