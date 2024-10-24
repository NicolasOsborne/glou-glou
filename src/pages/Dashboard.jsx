import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FaChevronRight } from 'react-icons/fa6'

import products from '../mockDatabase/products.json'

import DashboardProduct from '../components/DashboardProduct'
import DashboardHeader from '../components/DashboardHeader'
import Modal from '../components/Modal'
import ProductEditForm from '../components/ProductEditForm'
import Button from '../components/Button'

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('products')
  const [title, setTitle] = useState('Produits')
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const location = useLocation()

  useEffect(() => {
    // Determine the current view based on the URL
    const path = location.pathname.split('/').pop()
    if (path === 'orders') {
      setCurrentView('orders')
      setTitle('Commandes')
      //  fetchOrders()
    } else if (path === 'users') {
      setCurrentView('users')
      setTitle('Utilisateurs')
      //  fetchUsers()
    } else {
      setCurrentView('products')
      setTitle('Produits')
      fetchProducts()
    }
  }, [location])

  // const fetchProducts = async () => {
  //   const response = await fetch('/api/products')
  //   const products = await response.json()
  //   setData(products)
  // }
  const fetchProducts = async () => {
    setData(products)
  }

  // const fetchOrders = async () => {
  //   const response = await fetch('/api/orders')
  //   const orders = await response.json()
  //   setData(orders)
  // }

  // const fetchUsers = async () => {
  //   const response = await fetch('/api/users')
  //   const users = await response.json()
  //   setData(users)
  // }

  const getProductCategory = (category) => {
    switch (category) {
      case 1:
        return 'Bières'
      case 2:
        return 'Vins'
      case 3:
        return 'Spiritueux'
      case 4:
        return 'Sans Alcool'
      case 5:
        return 'Boissons Chaudes'
      default:
        return null
    }
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (product) => {
    console.log(`${product.name} a bien été supprimé`)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    fetchProducts()
  }

  const handleUpdateProduct = () => {
    handleCloseModal()
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleSubmitNewProduct = () => {
    handleCloseModal()
  }

  return (
    <section className='dashboard'>
      <div className='dashboard-content-container'>
        <aside className='dashboard-filters'>
          <div className='dashboard-filters_categories'>
            <Link to='/dashboard' className='dashboard-filters_title'>
              Produits
            </Link>
            <div className='filters-categories_list'>
              <Link to='/dashboard/bieres' className='filters-category'>
                <FaChevronRight className='filters-category_chevron' />
                <p className='filters-category_name'>Bières</p>
              </Link>
              <Link to='/dashboard/vins' className='filters-category'>
                <FaChevronRight className='filters-category_chevron' />
                <p className='filters-category_name'>Vins</p>
              </Link>
              <Link to='/dashboard/spiritueux' className='filters-category'>
                <FaChevronRight className='filters-category_chevron' />
                <p className='filters-category_name'>Spiritueux</p>
              </Link>
              <Link to='/dashboard/sans-alcool' className='filters-category'>
                <FaChevronRight className='filters-category_chevron' />
                <p className='filters-category_name'>Sans Alcool</p>
              </Link>
              <Link
                to='/dashboard/boissons-chaudes'
                className='filters-category'
              >
                <FaChevronRight className='filters-category_chevron' />
                <p className='filters-category_name'>Boissons Chaudes</p>
              </Link>
            </div>
          </div>
          <Link to='/dashboard/orders' className='dashboard-filters_title'>
            Commandes
          </Link>
          <Link to='/dashboard/users' className='dashboard-filters_title'>
            Utilisateurs
          </Link>
        </aside>
        <div className='dashboard-content'>
          <h1 className='dashboard-content_title'>{title}</h1>
          {currentView === 'products' && (
            <Button
              buttonText='+ Ajouter un produit'
              onClick={handleAddProduct}
              className='add-product-button'
            />
          )}
          <div className='dashboard-content_content'>
            <DashboardHeader currentView={currentView} />
            {currentView === 'products' &&
              data.map((product) => (
                <DashboardProduct
                  key={product.id}
                  productId={product.id}
                  productName={product.name}
                  productCategory={getProductCategory(product.category)}
                  productPrice={product.price}
                  productStock={product.stock}
                  onEditClick={() => handleEditProduct(product)}
                  onDeleteClick={() => handleDeleteProduct(product)}
                />
              ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductEditForm
          productName={
            selectedProduct ? selectedProduct.name : 'Nom du produit'
          }
          productCategory={
            selectedProduct
              ? getProductCategory(selectedProduct.category)
              : 'Catégorie du produit'
          }
          productDescription={
            selectedProduct
              ? selectedProduct.description
              : 'Description du produit'
          }
          productPrice={selectedProduct ? selectedProduct.price : 0.0}
          productStock={selectedProduct ? selectedProduct.stock : 0}
          onFormSubmit={
            selectedProduct ? handleUpdateProduct : handleSubmitNewProduct
          }
        />
      </Modal>
    </section>
  )
}

export default Dashboard
