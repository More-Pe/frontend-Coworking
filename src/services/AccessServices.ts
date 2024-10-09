import axios from 'axios';

const URL = 'http://localhost:4000/api/accesses';

export const registerEntry = async (room_id: number, token: string) => {
    try {
        const response = await axios.post(
            `${URL}/entry`, 
            { room_id }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error registering entry');
    }
};

export const registerExit = async (room_id: number, token: string) => {
    try {
        const response = await axios.post(
            `${URL}/exit`, 
            { room_id }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error registering exit');
    }
};

export const getCurrentPeopleInRoom = async (room_id: number) => {
    try {
        const response = await axios.get(`${URL}/current/room/${room_id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error getting current people in room');
    }
};