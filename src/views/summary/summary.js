import React, { useState, useEffect } from 'react';
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
        return (
            <div className='summary'>
                <span>Confirmados: {confirmed.value}</span>
                <span>Recuperados: {recovered.value}</span>
                <span>Muertos: {deaths.value}</span>
                <span>Hospitalizados: {hospitalized.value}</span>
                <span>UCI: {uci.value}</span>
            </div>
        );
    };

    return (
        <div>
            {loading ? 'Cargando...' : renderSummary()}
            {error && 'Error al obtener los datos'}
        </div>
    );
};

export default SummaryView;
