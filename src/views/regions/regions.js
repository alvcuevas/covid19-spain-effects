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
import { fetchRegions, fetchRegion } from '../../api';

import './regions.scss';

const RegionsView = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await fetchRegions();
                const { regions } = res;

                let regionsArr = [];
                Object.entries(regions).forEach(reg => {
                    regionsArr.push({ id: reg[0], value: reg[1] });
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
        fetchRegionData(selectedRegion);
    }, [selectedRegion]);

    const fetchRegionData = async region => {
        try {
            const res = await fetchRegion(region);
            setData(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const renderRegions = () => {
        const { confirmed, recovered, deaths, hospitalized, uci } = data;

        return data ? data.confirmed && 'Hay datos' : 'Cargando';
        // <BarChart width={800} height={350} data={plot}>
        //     <CartesianGrid strokeDasharray='3 3' />
        //     <XAxis dataKey='name' />
        //     <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
        //     <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
        //     <Tooltip />
        //     <Legend />
        //     <Bar
        //         yAxisId='left'
        //         dataKey='totales'
        //         fill='#8884d8'
        //         minPointSize={2}
        //     />
        //     <Bar
        //         yAxisId='right'
        //         dataKey='estimados'
        //         fill='#82ca9d'
        //         minPointSize={20}
        //     />
        // </BarChart>
    };

    return (
        <>
            <div className='regions'>
                <select onChange={e => setSelectedRegion(e.target.value)}>
                    {regions.map(region => (
                        <option key={region.id} value={region.id}>
                            {region.value}
                        </option>
                    ))}
                </select>
                {loading ? 'Cargando...' : renderRegions()}
                {error && 'Error al obtener los datos'}
            </div>
        </>
    );
};

export default RegionsView;
