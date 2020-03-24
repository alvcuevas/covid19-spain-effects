import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { fetchSummary, fetchRegions, fetchRegion } from '../../api';

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
                console.log(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderSummary = () => {
        const { confirmed, recovered, deaths, hospitalized, uci } = data;

        const plot = [
            {
                name: 'Confirmados',
                totales: confirmed.value,
                estimados: confirmed.estimateTomorrow
            },
            {
                name: 'Recuperados',
                totales: recovered.value,
                estimados: recovered.estimateTomorrow
            },
            {
                name: 'Muertos',
                totales: deaths.value,
                estimados: deaths.estimateTomorrow
            },
            {
                name: 'Hospitalizados',
                totales: hospitalized.value,
                estimados: hospitalized.estimateTomorrow
            },
            { name: 'UCI', totales: uci.value, estimados: uci.estimateTomorrow }
        ];

        return (
            <div className='summary'>
                <BarChart width={800} height={350} data={plot}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
                    <YAxis
                        yAxisId='right'
                        orientation='right'
                        stroke='#82ca9d'
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                        yAxisId='left'
                        dataKey='totales'
                        fill='#8884d8'
                        minPointSize={2}
                    />
                    <Bar
                        yAxisId='right'
                        dataKey='estimados'
                        fill='#82ca9d'
                        minPointSize={20}
                    />
                </BarChart>
            </div>
        );
    };

    return (
        <>
            {loading ? 'Cargando...' : renderSummary()}
            {error && 'Error al obtener los datos'}
        </>
    );
};

export default SummaryView;
