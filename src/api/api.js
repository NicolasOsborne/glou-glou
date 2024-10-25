import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API functions

// Register a new user :
export const registerUser = async (userData) => {
  return await api.post('/register', userData)
}

// Login an existing user :
export const loginUser = async (credentials) => {
  return await api.post('/login', credentials)
}

// Categories
// Fetch all categories :
export const fetchCategories = async () => {
  return await api.get('/category')
}

// Products
// Fetch all products :
export const fetchProducts = async () => {
  return await api.get('/produits')
}

export const addToCart = async (productId) => {
  return await api.post(`/cart/add/${productId}`)
}

export default api
