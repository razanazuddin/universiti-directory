import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div>
    <h2>404 - Not Found!</h2>
    <Link to="/">Go back</Link>
  </div>
);

export default NotFound;
