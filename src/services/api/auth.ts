import axiosInstance from './axiosInstance'

// Create a new user
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/users', payload)
    return response.data // Return the API response
  } catch (error) {
    throw error
  }
}

export const loginUser = async (payload) => {
  const { data } = await axiosInstance.post('/users/login', payload)
  return data
}
