import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FaChevronRight } from 'react-icons/fa6'

import { fetchProducts, fetchCategories } from '../api/api'

import DashboardHeader from '../components/DashboardHeader'
import DashboardProduct from '../components/DashboardProduct'
import DashboardCategory from '../components/DashboardCategory'

import ProductEditForm from '../components/ProductEditForm'
import CategoryEditForm from '../components/CategoryEditForm'

import Modal from '../components/Modal'
import Button from '../components/Button'

const Dashboard = () => {
  // State management
  const [currentView, setCurrentView] = useState('')
  const [title, setTitle] = useState('Dashboard')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formType, setFormType] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    // Determine the current view based on the URL
    const path = location.pathname.split('/').pop()
    if (path === 'categories') {
      setCurrentView('categories')
      setTitle('Catégories')
      fetchCategoriesData()
    } else if (path === 'products') {
      setCurrentView('products')
      setTitle('Produits')
      fetchProductsData()
    } else {
      setCurrentView('')
      setTitle('Dashboard')
      setProducts([])
      setCategories([])
    }
  }, [location])

  // Retrieve product data from database with API call
  const fetchProductsData = async () => {
    try {
      const response = await fetchProducts()
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Retrieve categories data from database with API call
  const fetchCategoriesData = async () => {
    try {
      const response = await fetchCategories()
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Modal
  const handleOpenModal = (item, type) => {
    setSelectedItem(item)
    setFormType(type)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setFormType('')
  }

  // Products
  const handleDeleteProduct = (product) => {
    console.log(`${product.name} a bien été supprimé`)
  }

  const handleUpdateProduct = (updatedProduct) => {
    console.log('Updated Product:', updatedProduct)
    handleCloseModal()
  }

  const handleSubmitNewProduct = () => {
    handleCloseModal()
  }

  // Orders
  const handleUpdateCategory = (updatedCategory) => {
    console.log('Updated Order:', updatedCategory)
    handleCloseModal()
  }

  const handleDeleteCategory = (category) => {
    console.log(`La commande ${category.id} a bien été annulée`)
  }

  return (
    <section className='dashboard'>
      <div className='dashboard-content-container'>
        <aside className='dashboard-filters'>
          <Link to='/dashboard/products' className='dashboard-filters_link'>
            <FaChevronRight className='dashboard-filters_link_chevron' />
            <p className='dashboard-filters_link_name'>Produits</p>
          </Link>
          <Link to='/dashboard/categories' className='dashboard-filters_link'>
            <FaChevronRight className='dashboard-filters_link_chevron' />
            <p className='dashboard-filters_link_name'>Catégories</p>
          </Link>
        </aside>
        <div className='dashboard-content'>
          <h1 className='dashboard-content_title'>{title}</h1>
          {currentView === 'products' && (
            <Button
              buttonText='+ Ajouter un produit'
              onClick={() => handleOpenModal(null, 'product')}
              className='add-product-button'
            />
          )}
          {currentView === 'categories' && (
            <Button
              buttonText='+ Ajouter une catégorie'
              onClick={() => handleOpenModal(null, 'category')}
              className='add-product-button'
            />
          )}
          <div className='dashboard-content_content'>
            <DashboardHeader currentView={currentView} />
            {currentView === 'products' &&
              products.map((product) => (
                <DashboardProduct
                  key={product.id}
                  productId={product.id}
                  productName={product.nom}
                  productCategory={product.categorie.nameCategory}
                  productPrice={product.prix}
                  productStock={product.quantite}
                  onEditClick={() => handleOpenModal(product, 'product')}
                  onDeleteClick={() => handleDeleteProduct(product)}
                />
              ))}
            {currentView === 'categories' &&
              categories.map((category) => {
                if (category && category.id && category.nameCategory) {
                  return (
                    <DashboardCategory
                      key={category.id}
                      categoryId={category.id}
                      categoryName={category.nameCategory}
                      onEditClick={() => handleOpenModal(category, 'category')}
                      onDeleteClick={() => handleDeleteCategory(category)}
                    />
                  )
                } else {
                  console.error('Category data is not valid:', category)
                  return null
                }
              })}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {formType === 'product' && (
          <ProductEditForm
            productName={selectedItem ? selectedItem.nom : 'Nom du produit'}
            productCategory={
              selectedItem
                ? selectedItem.categorie.nameCategory
                : 'Catégorie du produit'
            }
            productDescription={
              selectedItem ? selectedItem.description : 'Description du produit'
            }
            productPrice={selectedItem ? selectedItem.prix : 0.0}
            productStock={selectedItem ? selectedItem.quantite : 0}
            onFormSubmit={
              selectedItem ? handleUpdateProduct : handleSubmitNewProduct
            }
          />
        )}
        {formType === 'category' && selectedItem && (
          <CategoryEditForm
            categoryId={selectedItem.id}
            categoryName={selectedItem.nameCategory}
            categoryDescription={selectedItem.descriptionCategory}
            onFormSubmit={handleUpdateCategory}
          />
        )}
      </Modal>
    </section>
  )
}

export default Dashboard
