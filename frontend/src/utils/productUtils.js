export const getProductImageURL = (imagePath) => {
  const baseURL = 'http://127.0.0.1:8000/'
  return `${baseURL}${imagePath}`
}
