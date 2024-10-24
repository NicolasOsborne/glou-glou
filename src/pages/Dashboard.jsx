import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FaChevronRight } from 'react-icons/fa6'

import products from '../mockDatabase/products.json'
import orders from '../mockDatabase/orders.json'
import users from '../mockDatabase/users.json'

import DashboardProduct from '../components/DashboardProduct'
import DashboardHeader from '../components/DashboardHeader'
import Modal from '../components/Modal'
import Button from '../components/Button'
import ProductEditForm from '../components/ProductEditForm'
import DashboardOrder from '../components/DashboardOrder'
import DashboardUser from '../components/DashboardUser'
import OrderEditForm from '../components/OrderEditForm'
import UserEditForm from '../components/UserEditForm'

const Dashboard = () => {
  // State management
  const [currentView, setCurrentView] = useState('products')
  const [title, setTitle] = useState('Produits')
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formType, setFormType] = useState('')

  const location = useLocation()

  useEffect(() => {
    // Determine the current view based on the URL
    const path = location.pathname.split('/').pop()
    if (path === 'orders') {
      setCurrentView('orders')
      setTitle('Commandes')
      fetchOrders()
    } else if (path === 'users') {
      setCurrentView('users')
      setTitle('Utilisateurs')
      fetchUsers()
    } else {
      setCurrentView('products')
      setTitle('Produits')
      fetchProducts()
    }
  }, [location])

  const fetchProducts = async () => {
    //   const response = await fetch('/api/products')
    //   const products = await response.json()
    setData(products)
  }

  const fetchOrders = async () => {
    //   const response = await fetch('/api/orders')
    //   const orders = await response.json()
    setData(orders)
  }

  const fetchUsers = async () => {
    //   const response = await fetch('/api/users')
    //   const users = await response.json()
    setData(users)
  }

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
  const handleUpdateOrder = (updatedOrder) => {
    console.log('Updated Order:', updatedOrder)
    handleCloseModal()
  }

  const handleDeleteOrder = (order) => {
    console.log(`La commande ${order.id} a bien été annulée`)
  }

  // Users
  const handleUpdateUser = (updatedUser) => {
    console.log('Updated User:', updatedUser)
    handleCloseModal()
  }
  const handleDeleteUser = (user) => {
    console.log(`L'utilisateur ${user.email} a bien été annulée`)
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
    // fetchProducts()
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
              onClick={() => handleOpenModal(null, 'product')}
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
                  onEditClick={() => handleOpenModal(product, 'product')}
                  onDeleteClick={() => handleDeleteProduct(product)}
                />
              ))}
            {currentView === 'orders' &&
              data.map((order) => (
                <DashboardOrder
                  key={order.id}
                  orderId={order.id}
                  orderCustomer={order.customer_id}
                  orderStatus={order.status}
                  orderAmount={order.amount}
                  orderQuantity={order.quantity}
                  onEditClick={() => handleOpenModal(order, 'order')}
                  onDeleteClick={() => handleDeleteOrder(order)}
                />
              ))}
            {currentView === 'users' &&
              data.map((user) => (
                <DashboardUser
                  key={user.id}
                  userId={user.id}
                  userEmail={user.email}
                  userRole={user.role}
                  userOrders={user.orders}
                  onEditClick={() => handleOpenModal(user, 'user')}
                  onDeleteClick={() => handleDeleteUser(user)}
                />
              ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {formType === 'product' && (
          <ProductEditForm
            productName={selectedItem ? selectedItem.name : 'Nom du produit'}
            productCategory={
              selectedItem
                ? getProductCategory(selectedItem.category)
                : 'Catégorie du produit'
            }
            productDescription={
              selectedItem ? selectedItem.description : 'Description du produit'
            }
            productPrice={selectedItem ? selectedItem.price : 0.0}
            productStock={selectedItem ? selectedItem.stock : 0}
            onFormSubmit={
              selectedItem ? handleUpdateProduct : handleSubmitNewProduct
            }
          />
        )}
        {formType === 'order' && selectedItem && (
          <OrderEditForm
            orderStatus={selectedItem.status}
            orderAmount={selectedItem.amount}
            orderQuantity={selectedItem.quantity}
            orderCustomer={selectedItem.customer_id}
            onFormSubmit={handleUpdateOrder}
          />
        )}
        {formType === 'user' && selectedItem && (
          <UserEditForm
            userEmail={selectedItem.email}
            userRole={selectedItem.role}
            userOrders={selectedItem.orders}
            onFormSubmit={handleUpdateUser}
          />
        )}
      </Modal>
    </section>
  )
}

export default Dashboard
