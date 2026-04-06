// BackButton.jsx
import { useNavigate } from 'react-router-dom';

const BackButton = ({ fallback = '/dashboard', label = 'Go back' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
    >
      <span className="text-base">←</span>
      {label}
    </button>
  );
};

export default BackButton;