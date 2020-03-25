import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { fetchSummary } from '../../api';
import Spinner from '../../components/spinner';

import './summary.scss';

const SummaryView = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSummary();
                setData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const renderSummary = () => {
    //     const { confirmed, recovered, deaths, hospitalized, uci } = data;

    //     const plot = [
    //         {
    //             name: 'Confirmados',
    //             totales: confirmed.value,
    //             estimados: confirmed.estimateTomorrow
    //         },
    //         {
    //             name: 'Recuperados',
    //             totales: recovered.value,
    //             estimados: recovered.estimateTomorrow
    //         },
    //         {
    //             name: 'Muertos',
    //             totales: deaths.value,
    //             estimados: deaths.estimateTomorrow
    //         },
    //         {
    //             name: 'Hospitalizados',
    //             totales: hospitalized.value,
    //             estimados: hospitalized.estimateTomorrow
    //         },
    //         { name: 'UCI', totales: uci.value, estimados: uci.estimateTomorrow }
    //     ];

    //     return (
    //         <div className='summary'>
    //             <ResponsiveContainer>
    //                 <BarChart width={800} height={350} data={plot}>
    //                     <CartesianGrid strokeDasharray='3 3' />
    //                     <XAxis dataKey='name' />
    //                     <YAxis
    //                         yAxisId='left'
    //                         orientation='left'
    //                         stroke='#8884d8'
    //                     />
    //                     <YAxis
    //                         yAxisId='right'
    //                         orientation='right'
    //                         stroke='#82ca9d'
    //                     />
    //                     <Tooltip />
    //                     <Legend />
    //                     <Bar
    //                         yAxisId='left'
    //                         dataKey='totales'
    //                         fill='#8884d8'
    //                         minPointSize={2}
    //                     />
    //                     <Bar
    //                         yAxisId='right'
    //                         dataKey='estimados'
    //                         fill='#82ca9d'
    //                         minPointSize={20}
    //                     />
    //                 </BarChart>
    //             </ResponsiveContainer>
    //         </div>
    //     );
    // };

    const renderSpinner = () => (
        <div className='loader'>
            <Spinner />
        </div>
    );

    const renderSummary = () => {
        const { confirmed, recovered, deaths, hospitalized, uci } = data;
        const barsData = [
            {
                status: 'Confirmados',
                totales: confirmed.value,
                totalesColor: 'hsl(44, 70%, 50%)',
                estimados: confirmed.estimateTomorrow,
                estimadosColor: 'hsl(172, 70%, 50%)'
            },
            {
                status: 'Recuperados',
                totales: recovered.value,
                totalesColor: 'hsl(30, 70%, 50%)',
                estimados: recovered.estimateTomorrow,
                estimadosColor: 'hsl(32, 70%, 50%)'
            },
            {
                status: 'Muertos',
                totales: deaths.value,
                totalesColor: 'hsl(196, 70%, 50%)',
                estimados: deaths.estimateTomorrow,
                estimadosColor: 'hsl(323, 70%, 50%)'
            },
            {
                status: 'Hospitalizados',
                totales: hospitalized.value,
                totalesColor: 'hsl(31, 70%, 50%)',
                estimados: hospitalized.estimateTomorrow,
                estimadosColor: 'hsl(273, 70%, 50%)'
            },
            {
                status: 'UCI',
                totales: uci.value,
                totalesColor: 'hsl(337, 70%, 50%)',
                estimados: uci.estimateTomorrow,
                estimadosColor: 'hsl(73, 70%, 50%)'
            }
        ];
        return (
            <div className='summary'>
                <ResponsiveBar
                    data={barsData}
                    keys={['totales', 'estimados']}
                    indexBy='status'
                    margin={{ top: 25, right: 130, bottom: 100, left: 60 }}
                    padding={0.25}
                    groupMode='grouped'
                    colors={{ scheme: 'nivo' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#f6f6f6',
                            rotation: -45,
                            lineWidth: 1,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        // {
                        //     match: {
                        //         id: 'totales'
                        //     },
                        //     id: 'dots'
                        // },
                        {
                            match: {
                                id: 'estimados'
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', '1.6']]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        // legend: 'status',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        // legend: 'food',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    enableLabel={false}
                    labelSkipWidth={12}
                    labelSkipHeight={36}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]]
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: -19,
                            translateY: 90,
                            itemsSpacing: 4,
                            itemWidth: 82,
                            itemHeight: 55,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 19,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        );
    };

    return (
        <>
            {loading && renderSpinner()}
            {!loading && data && renderSummary()}
            {error && 'Error al obtener los datos'}
        </>
    );
};

export default SummaryView;
