import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import SummaryView from './views/summary/summary';
import RegionsView from './views/regions/regions';
import GlobalView from './views/global/global';

import './App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <div className='wrapper'>
                <div className='header'>
                    <span>
                        Representación en tiempo real de los efectos del
                        COVID-19 en España
                    </span>
                    <nav className='navigation'>
                        <ul>
                            <li>
                                <Link to='/'>
                                    <button>Efectos nacionalidad</button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/regions'>
                                    <button>Efectos comunidades</button>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/global'}>
                                    <button>Efectos mundiales</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='content'>
                    <Switch>
                        <Route
                            exact
                            path={'/'}
                            render={() => <SummaryView />}
                        />
                        <Route
                            path={'/regions'}
                            render={() => <RegionsView />}
                        />
                        <Route path={'/global'} render={() => <GlobalView />} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
