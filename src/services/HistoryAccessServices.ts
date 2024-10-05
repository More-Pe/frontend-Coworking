import axios from 'axios';

const URL = 'http://localhost:4000/api/access-histories';

export const getAccessHistories = async (start_date: string, end_date: string, token: string) => {
    try {
        const response = await axios.get(`${URL}`, {
            params: { start_date, end_date },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving access histories');
    }
};

export const getAccessHistoriesByRoom = async (room_id: number, start_date: string, end_date: string, token: string) => {
    try {
        const response = await axios.get(`${URL}/room/${room_id}`, {
            params: { start_date, end_date },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving access histories for the room');
    }
};