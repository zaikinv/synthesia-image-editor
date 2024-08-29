import { Link } from 'react-router-dom';
import './style.scss';

export const NotFoundRoute = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404 - Not Found</h1>
      <p className="not-found__message">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="not-found__link">
        Go back to Home
      </Link>
    </div>
  );
};
