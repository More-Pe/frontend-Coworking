import axios from 'axios';

const URL = 'http://localhost:4000/api/persons';

export const getPersons = async (token: string) => {
    try {
        const response = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving users');
    }
};

export const getPersonById = async (id: number) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving user');
    }
};

export const getOwnProfile = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving profile');
    }
};

export const createUserByAdmin = async (userData: any) => {
    try {
        const response = await axios.post(`${URL}/create`, userData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};

export const updateOwnProfile = async (updateData: any, token: string) => {
    try {
        const response = await axios.patch(`${URL}/profile`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error updating profile');
    }
};

export const updatePersonByAdmin = async (id: number, updateData: any, token: string) => {
    try {
        const response = await axios.put(`${URL}/${id}`, updateData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error updating person');
    }
};

export const deletePerson = async (id: number, token: string) => {
    try {
        const response = await axios.delete(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error deleting user');
    }
};

export const getCurrentAccess = async (id: number, token: string) => {
    try {
        const response = await axios.get(`${URL}/${id}/current-access`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving current access');
    }
};

export const getAccessHistory = async (id: number) => {
    try {
        const response = await axios.get(`${URL}/${id}/access-history`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving access history');
    }
};