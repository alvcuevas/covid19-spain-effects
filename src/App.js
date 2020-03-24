import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import SummaryView from './views/summary/summary';
import RegionsView from './views/regions/regions';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="header">
          Representación en tiempo real de los efectos del COVID-19 en España
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">
                  <button>Datos generales</button>
                </Link>
              </li>
              <li>
                <Link to="/regions">
                  <button>Datos por comunidad</button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="content">
          <Switch>
            <Route exact path={'/'} render={() => <SummaryView />} />
            <Route path={'/regions'} render={() => <RegionsView />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
