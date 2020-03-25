import axios from 'axios';
const API_SPAIN = 'https://spanish-api-covid19.pedelriomarron.now.sh/api';
const API_INTER = 'https://covid19.mathdro.id/api';

const fetchSummary = async () => {
    const { data } = await axios.get(`${API_SPAIN}`);
    return {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        hospitalized: data.hospitalized,
        uci: data.uci
    };
};

const fetchRegions = async () => {
    const { data } = await axios.get(`${API_SPAIN}/regions`);
    return data;
};

const fetchRegion = async region => {
    const { data } = await axios.get(`${API_SPAIN}/regions/${region}`);
    return {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        hospitalized: data.hospitalized,
        uci: data.uci
    };
};

const fetchDaily = async () => {
    const { data } = await axios.get(`${API_INTER}/daily`);
    return data;
};

export { fetchSummary, fetchRegions, fetchRegion, fetchDaily };
