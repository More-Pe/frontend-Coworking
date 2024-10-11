import axios from 'axios';

const URL = 'http://localhost:4000/api/startups';

export const getAllStartups = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving startups');
    }
};

export const getStartupById = async (id: number, token: string) => {
    try {
        const response = await axios.get(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving startup');
    }
};

export const createStartup = async (startupData: any, token: string) => {
    try {
        const response = await axios.post(URL, startupData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error creating startup');
    }
};

export const updateStartup = async (id: number, updateData: any, token: string) => {
    try {
        const response = await axios.put(`${URL}/${id}`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error updating startup');
    }
};

export const deleteStartup = async (id: number, token: string) => {
    try {
        const response = await axios.delete(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error deleting startup');
    }
};

export const getPersonsByStartupId = async (id: number, token: string) => {
    try {
        const response = await axios.get(`${URL}/${id}/persons`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving persons for startup');
    }
};

export const getStartupPrograms = async () => {
    try {
        const response = await axios.get(`${URL}/programs`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving startups');
    }
};