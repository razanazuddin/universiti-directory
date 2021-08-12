import React from 'react';
import { Link, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const NotFound: React.FC = () => {
  const customHistory = createBrowserHistory();
  return (
    <div>
      <h2>404 - Not Found!</h2>
      <Router history={customHistory}>
        <Link to="/">Go back</Link>
      </Router>
    </div>
  );
};

export default NotFound;
