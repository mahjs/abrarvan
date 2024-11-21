import axiosInstance from './axiosInstance'
import type { LoginReq, RegisterReq } from './interfaces'

// Create a new user
export const registerUser = async (payload: RegisterReq) => {
  try {
    const response = await axiosInstance.post('/users', payload)
    return response.data // Return the API response
  } catch (error) {
    throw error
  }
}

export const loginUser = async (payload: LoginReq) => {
  const { data } = await axiosInstance.post('/users/login', payload)
  return data
}
