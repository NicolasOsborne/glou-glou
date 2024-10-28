import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FaChevronRight } from 'react-icons/fa6'

import {
  fetchProducts,
  createProduct,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteProduct,
  updateProduct,
  fetchOrders,
} from '../api/api'

import DashboardHeader from '../components/DashboardHeader'
import DashboardProduct from '../components/DashboardProduct'
import DashboardCategory from '../components/DashboardCategory'

import ProductEditForm from '../components/ProductEditForm'
import CategoryEditForm from '../components/CategoryEditForm'

import ProductCreateForm from '../components/ProductCreateForm'
import CategoryCreateForm from '../components/CategoryCreateForm'

import Modal from '../components/Modal'
import Button from '../components/Button'
import DashboardOrder from '../components/DashboardOrder'

const Dashboard = () => {
  // State management
  const [currentView, setCurrentView] = useState('')
  const [title, setTitle] = useState('Dashboard')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [formType, setFormType] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const path = location.pathname.split('/').pop()
    if (path === 'categories') {
      setCurrentView('categories')
      setTitle('Catégories')
      fetchCategoriesData()
    } else if (path === 'products') {
      setCurrentView('products')
      setTitle('Produits')
      fetchProductsData()
    } else if (path === 'orders') {
      setCurrentView('orders')
      setTitle('Commandes')
      fetchOrdersData()
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

  // Retrieve orders data from database with API call
  const fetchOrdersData = async () => {
    try {
      const response = await fetchOrders()
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
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
  const handleCreateProduct = async (newProduct) => {
    try {
      const response = await createProduct(newProduct)
      setProducts((prevProducts) => [...prevProducts, response.data])
      handleCloseModal()
    } catch (error) {
      console.error('Error creating new product:', error)
    }
  }

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const payload = {
        nameProduit: updatedProduct.nom,
        descriptionProduit: updatedProduct.description,
        price: updatedProduct.prix,
        quantiteProduit: updatedProduct.quantite,
        imageProduit: updatedProduct.image,
      }
      console.log('Updating product with payload:', payload)
      const response = await updateProduct(selectedItem.id, payload)
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedItem.id ? response.data : product
        )
      )
      handleCloseModal()
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error)
    }
  }

  const handleDeleteProduct = async (product) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le produit "${product.nom}" ?`
    )
    if (confirmDelete) {
      try {
        await deleteProduct(product)
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        )
        console.log(`${product.nom} a bien été supprimé`)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  // Categories
  const handleCreateCategory = async (newCategory) => {
    try {
      const response = await createCategory(newCategory)
      setCategories((prevCategories) => [...prevCategories, response.data])
      handleCloseModal()
    } catch (error) {
      console.error('Error creating a new category:', error)
    }
  }

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      const response = await updateCategory({
        id: selectedItem.id,
        nameCategory: updatedCategory.categoryName,
        descriptionCategory: updatedCategory.categoryDescription,
      })
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === response.data.id ? response.data : category
        )
      )
      handleCloseModal()
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDeleteCategory = async (category) => {
    const confirmCategoryDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la catégorie "${category.nameCategory}" ?`
    )
    if (confirmCategoryDelete) {
      try {
        await deleteCategory(category)
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== category.id)
        )
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
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
          <Link to='/dashboard/orders' className='dashboard-filters_link'>
            <FaChevronRight className='dashboard-filters_link_chevron' />
            <p className='dashboard-filters_link_name'>Commandes</p>
          </Link>
        </aside>
        <div className='dashboard-content'>
          <h1 className='dashboard-content_title'>{title}</h1>
          {currentView === 'products' && (
            <Button
              buttonText='+ Ajouter un produit'
              onClick={() => handleOpenModal(null, 'createProduct')}
              className='add-product-button'
            />
          )}
          {currentView === 'categories' && (
            <Button
              buttonText='+ Ajouter une catégorie'
              onClick={() => handleOpenModal(null, 'createCategory')}
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
            {currentView === 'orders' &&
              orders.map((order) => (
                <DashboardOrder
                  key={order.id}
                  orderId={order.id}
                  orderCustomer={order.user}
                  orderStatus={order.statut}
                  onEditClick={() => handleOpenModal(order, 'order')}
                  onDeleteClick={() => handleDeleteCategory(order)}
                />
              ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {formType === 'product' && selectedItem && (
          <ProductEditForm
            productId={selectedItem.id}
            productName={selectedItem.nom}
            productCategory={selectedItem.categorie.nameCategory}
            productDescription={selectedItem.description}
            productPrice={selectedItem.prix}
            productStock={selectedItem.quantite}
            productImage={selectedItem.image}
            onFormSubmit={handleUpdateProduct}
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
        {formType === 'createProduct' && (
          <ProductCreateForm onFormSubmit={handleCreateProduct} />
        )}
        {formType === 'createCategory' && (
          <CategoryCreateForm onFormSubmit={handleCreateCategory} />
        )}
      </Modal>
    </section>
  )
}

export default Dashboard
