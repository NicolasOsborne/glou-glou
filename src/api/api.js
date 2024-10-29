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

const apiCreate = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

apiCreate.interceptors.request.use((config) => {
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

// Create new category :
export const createCategory = async (categoryData) => {
  return await api.post('/category/create', categoryData)
}

// Update category :
export const updateCategory = async (categoryData) => {
  return await api.put(`/category/update/${categoryData.id}`, categoryData)
}

// Delete category :
export const deleteCategory = async (categoryData) => {
  return await api.delete(`/category/delete/${categoryData.id}`)
}

// Products
// Fetch all products :
export const fetchProducts = async () => {
  return await api.get('/produits')
}

// Create new product :
export const createProduct = async (productData) => {
  return await apiCreate.post('/produit/create', productData)
}

// Update product :
export const updateProduct = async (productId, productData) => {
  return await apiCreate.put(`/produit/update/${productId}`, productData)
}

// Delete product :
export const deleteProduct = async (productData) => {
  return await api.delete(`/produit/delete/${productData.id}`)
}

// Filter products :
// By category:
export const filterByCategory = async (categoryId) => {
  const response = await api.get(`/produits/filter?categorie=${categoryId}`)
  return response.data
}

// By date :

// By price :

// By name :

// Combined filters :

// Cart
// Add product to cart
export const addToCart = async (productId) => {
  return await api.post(`/cart/add/${productId}`)
}

// Fetch user's cart
export const fetchUserCart = async () => {
  return await api.get('/cart')
}

// Validate order
export const validateOrder = async () => {
  return await api.post('/cart/validate')
}

// Order history
export const fetchOrders = async () => {
  return await api.get('/historique')
}

// Fetch top products
export const fetchTopProducts = async () => {
  return await api.get('/top-products')
}

export default api
