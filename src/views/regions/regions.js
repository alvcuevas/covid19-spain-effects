import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
        Object.entries(regions).forEach(reg =>
          regionsArr.push({ id: reg[0], value: reg[1] })
        );
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
    setLoading(true);
    try {
      if (region.length !== 0) {
        const res = await fetchRegion(region);
        res && setData(res);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const renderRegions = () => {
    const { confirmed, recovered, deaths, hospitalized, uci } = data;

    const plot = [
      {
        name: 'Confirmados',
        totales: confirmed.value,
        estimados: confirmed.estimateTomorrow,
      },
      {
        name: 'Recuperados',
        totales: recovered.value,
        estimados: recovered.estimateTomorrow,
      },
      {
        name: 'Muertos',
        totales: deaths.value,
        estimados: deaths.estimateTomorrow,
      },
      {
        name: 'Hospitalizados',
        totales: hospitalized.value,
        estimados: hospitalized.estimateTomorrow,
      },
      { name: 'UCI', totales: uci.value, estimados: uci.estimateTomorrow },
    ];

    return (
      <BarChart
        width={800}
        height={350}
        data={plot}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          domain={[0, 'auto']}
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
        />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="totales" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="estimados" fill="#82ca9d" />
      </BarChart>
    );
  };

  const renderSpinner = () => (
    <div className="loader">
      <Spinner />
    </div>
  );

  return (
    <>
      <div className="regions">
        <select onChange={e => setSelectedRegion(e.target.value)}>
          {regions.map(region => (
            <option key={region.id} value={region.id}>
              {region.value}
            </option>
          ))}
        </select>
        {loading && renderSpinner()}
        {!loading && data && renderRegions()}
        {error && 'Error al obtener los datos'}
      </div>
    </>
  );
};

export default RegionsView;
