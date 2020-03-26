import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import SummaryView from './views/summary/summary';
import RegionsView from './views/regions/regions';
import GlobalView from './views/global/global';
import { Button } from 'antd';

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
                                    <Button type='default'>
                                        Efecto en país
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to='/regions'>
                                    <Button type='default'>
                                        Efecto por comunidad
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/global'}>
                                    <Button type='default'>
                                        Efecto global
                                    </Button>
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
