import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { fetchDaily, fetchWorldSummary } from '../../api';
import Spinner from '../../components/spinner';

import './global.scss';

const GlobalView = () => {
    const [worldData, setWorldData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const daily = await fetchDaily();
                const world = await fetchWorldSummary();
                const confirmed = [];
                const recovered = [];
                if (daily) {
                    daily.forEach(el => {
                        confirmed.push({
                            x: el.reportDate,
                            y: el.totalConfirmed
                        });
                        recovered.push({
                            x: el.reportDate,
                            y: el.totalRecovered || 0
                        });
                    });
                    setGraphData([
                        {
                            id: 'Confirmados',
                            color: 'hsl(127, 70%, 50%)',
                            data: confirmed
                        },
                        {
                            id: 'Recuperados',
                            color: 'hsl(336, 70%, 50%)',
                            data: recovered
                        }
                    ]);
                }
                world && setWorldData(world);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderGraph = () => {
        const { lastUpdate } = worldData;
        const date = new Date(lastUpdate);
        const formatted = date.toLocaleString();
        return (
            <>
                <div className='global-graph'>
                    <ResponsiveLine
                        data={graphData}
                        margin={{ top: 20, right: 110, bottom: 100, left: 60 }}
                        xScale={{
                            type: 'time',
                            format: '%Y-%m-%d',
                            precision: 'day'
                        }}
                        xFormat='time:%Y-%m-%d'
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false
                        }}
                        curve='natural'
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            format: '%b %d',
                            tickValues: `every 5 days`,
                            tickRotation: 0
                        }}
                        colors={['#E60000', 'green']}
                        pointSize={7}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabel='y'
                        pointLabelYOffset={-12}
                        areaBaselineValue={10}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 1,
                                translateY: 63,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 100,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground:
                                                'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
                <div className='last_update'>
                    <span>
                        Última actualización - <b>{formatted}</b>
                    </span>
                </div>
            </>
        );
    };

    const renderSpinner = () => (
        <div className='loader'>
            <Spinner color={'#E8C1A0'} />
        </div>
    );

    const renderSummary = () => {
        const { confirmed, recovered, deaths } = worldData;
        return (
            <div className='global-summary'>
                <div className='confirmed'>
                    <span className='confirmed__value'>{confirmed?.value}</span>
                    <span className='confirmed__title'>Confirmados</span>
                </div>
                <div className='recovered'>
                    <span className='recovered__value'>{recovered?.value}</span>
                    <span className='recovered__title'>Recuperados</span>
                </div>
                <div className='deaths'>
                    <span className='deaths__value'>{deaths?.value}</span>
                    <span className='deaths__title'>Fallecidos</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='global'>
                {loading && renderSpinner()}
                {!loading && worldData && renderSummary()}
                {!loading && graphData && renderGraph()}
                {error && 'Error al obtener los datos'}
            </div>
        </>
    );
};

export default GlobalView;
