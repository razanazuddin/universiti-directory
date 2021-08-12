import { Switch, Route, Link, BrowserRouter, Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserHistory } from 'history';

import UniversitiesList from './components/UniversitiesList';
import Subscription from './components/Subscription';
import NotFound from './components/NotFound';

const App = () => {
  const customHistory = createBrowserHistory();

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand"></div>
        <div className="navbar-nav mr-auto">
          <BrowserRouter>
            <li className="nav-item">
              <Link to={'/universities'} className="nav-link">
                Universities
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/institutions'} className="nav-link">
                Institutions
              </Link>
            </li>
          </BrowserRouter>
        </div>
      </nav>

      <div className="container fixed-bottom mb-3">
        <div className="row justify-content-end">
          <div className="col-md-4">
            <Subscription />
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <Router history={customHistory}>
          <Switch>
            <Route
              exact
              path={['/', '/universities']}
              component={UniversitiesList}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
