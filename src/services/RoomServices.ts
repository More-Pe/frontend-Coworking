import axios from 'axios';

const URL = 'http://localhost:4000/api/rooms';

export const getAllRooms = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving rooms');
    }
};

export const getRoomById = async (id: number) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving room');
    }
};

export const createRoom = async (roomData: any, token: string) => {
    try {
        const response = await axios.post(URL, roomData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error creating room');
    }
};

export const updateRoom = async (id: number, updateData: any, token: string) => {
    try {
        const response = await axios.put(`${URL}/${id}`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error updating room');
    }
};

export const deleteRoom = async (id: number, token: string) => {
    try {
        const response = await axios.delete(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error deleting room');
    }
};

export const getRoomCurrentStatus = async (id: number) => {
    try {
        const response = await axios.get(`${URL}/${id}/current-status`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving room status');
    }
};