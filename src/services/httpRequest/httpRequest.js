import axios from 'axios';

export const getFetchApi = async (path) => {
    const url = 'http://localhost:5000/api/' + path;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

