import { FC } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
}

export const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages }) => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (currentPage > 1) {
      navigate(`/gallery?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      navigate(`/gallery?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="paginator">
      <button
        className="paginator__button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        ←
      </button>
      <span className="paginator__info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="paginator__button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};
