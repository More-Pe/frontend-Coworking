import axios from 'axios';

const URL = 'http://localhost:4000/api/administration';

export const generateDailyReport = async (report_date: string, token: string) => {
    try {
        const response = await axios.post(
            `${URL}/daily-report`, 
            { report_date },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error generating daily report');
    }
};

export const getReportsInRange = async (start_date: string, end_date: string, token: string, page: number, limit: number) => {
    try {
        const response = await axios.get(`${URL}/reports`, {
            params: { start_date, end_date, page, limit },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving reports');
    }
};

export const getRoomUsageStats = async (token: string) => {
    try {
        const response = await axios.get(`${URL}/room-usage`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error retrieving room usage statistics');
    }
};