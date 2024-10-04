import axios from 'axios';

const URL = 'http://localhost:4000/api';

export const registerUser = async (data: {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  startup: string;
  dni?: string;
  phone?: string;
}) => {
  try {
    const response = await axios.post(`${URL}/register`, data);
    console.log('User registered successfully:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error response from server:', error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error('Error registering user:', error.message);
      throw new Error(error.message);
    }
  }
};

export const loginUser = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(`${URL}/login`, data);
      console.log('User login successfully:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error response from server:', error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        console.error('Error logging user:', error.message);
        throw new Error(error.message);
      }
    }
  };


