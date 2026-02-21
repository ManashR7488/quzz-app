import useQuizStore from '../stores/quizStore';
import UserInfoModal from '../components/UserInfoModal';
import QuizForm from '../components/QuizForm';
import ResultPage from '../components/ResultPage';

const Home = () => {
  const { step } = useQuizStore();

  if (step === 'modal') {
    return <UserInfoModal />;
  }

  if (step === 'quiz') {
    return <QuizForm />;
  }

  if (step === 'result') {
    return <ResultPage />;
  }

  return null;
};

export default Home;
