import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { fetchRegions, fetchRegion } from '../../api';
import Spinner from '../../components/spinner';

import './regions.scss';

const RegionsView = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('10');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetchRegions();
                const { regions } = res;

                let regionsArr = [];
                Object.values(regions).forEach(reg => {
                    // let test = { id: reg[0], value: reg[1] };
                    regionsArr.push(reg);
                });
                setRegions(regionsArr);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        const fetchRegionData = async region => {
            setLoading(true);
            try {
                const res = await fetchRegion(region);
                setData(res);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegionData(selectedRegion);
    }, [selectedRegion]);

    const renderRegions = () => (
        <select onChange={e => setSelectedRegion(e.target.value)}>
            {regions.map(region => (
                <option key={region.code} value={region.code}>
                    {region.name}
                </option>
            ))}
        </select>
    );

    const renderGraph = () => {
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
            <ResponsiveContainer>
                <BarChart
                    width={800}
                    height={350}
                    data={plot}
                    margin={{
                        top: 20
                    }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis
                        domain={[0, 'auto']}
                        yAxisId='left'
                        orientation='left'
                        stroke='#8884d8'
                    />
                    <YAxis
                        yAxisId='right'
                        orientation='right'
                        stroke='#82ca9d'
                    />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId='left' dataKey='totales' fill='#8884d8' />
                    <Bar yAxisId='right' dataKey='estimados' fill='#82ca9d' />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    const renderSpinner = () => (
        <div className='loader'>
            <Spinner />
        </div>
    );

    return (
        <>
            <div className='regions'>
                {renderRegions()}
                {loading && renderSpinner()}
                {!loading && data && renderGraph()}
                {error && 'Error al obtener los datos'}
            </div>
        </>
    );
};

export default RegionsView;
