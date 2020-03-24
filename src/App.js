import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import SummaryView from './views/summary/summary';
import RegionsView from './views/regions/regions';

import './App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <div className='wrapper'>
                <div className='header'>
                    Datos en tiempo real sobre el efecto del COVID-19 en España
                    <nav className='navigation'>
                        <ul>
                            <li>
                                <Link to='/'>
                                    <button>Datos actuales</button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/regions'>
                                    <button>Datos por región</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route exact path={'/'} render={() => <SummaryView />} />
                    <Route path={'/regions'} render={() => <RegionsView />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
