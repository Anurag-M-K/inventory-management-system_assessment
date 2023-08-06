import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupForm from './pages/Signup';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './utils/PrivateRoutes'
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import AddProductModal from './components/AddProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { setBlur } from './redux/features/blurSlice';
import CustomersManagePage from './pages/CustomersManagePage';
import SalesDetailsPage from './pages/SalesDetailsPage';
import CustomerLedger from './pages/CustomerLedger';
import ItemsReports from './pages/ItemsReports';
import EmailExport from './components/EmailExport';


function routes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { bluring } = useSelector(state => state.blur)

  const handleAddProductClick = () => {
    setIsModalOpen(true);
    dispatch(setBlur(true))
  };

  const closeModal = () => {
    dispatch(setBlur(false))
    setIsModalOpen(false);
  };

  return (
    <BrowserRouter>
    <Routes>

            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/l" element={<EmailExport />} />
            <Route path="/" element={<Home />} />
            {/* <Route exact  path="/dashboard" element={<PrivateRoutes> <Dashboard /></PrivateRoutes>} /> */}
            <Route path="/dashboard" element={
           <PrivateRoutes>
           <Sidebar onAddProductClick={handleAddProductClick}>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
            <AddProductModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
            </PrivateRoutes>
          }
        />
            <Route path="/customers" element={
           <PrivateRoutes>
           <Sidebar  onAddProductClick={handleAddProductClick}>
              <Layout>
                <CustomersManagePage />
              </Layout>
            </Sidebar>
            </PrivateRoutes>
          }
        />
            <Route path="/sales" element={
           <PrivateRoutes>
           <Sidebar  onAddProductClick={handleAddProductClick}>
              <Layout>
                <SalesDetailsPage />
              </Layout>
            </Sidebar>
            </PrivateRoutes>
          }
        />
            <Route path="/customer-ledger/:id" element={
           <PrivateRoutes>
           <Sidebar  onAddProductClick={handleAddProductClick}>
              <Layout>
                <CustomerLedger />
              </Layout>
            </Sidebar>
            </PrivateRoutes>
          }
        />
            <Route path="/itemspage" element={
           <PrivateRoutes>
           <Sidebar  onAddProductClick={handleAddProductClick}>
              <Layout>
                <ItemsReports />
              </Layout>
            </Sidebar>
            </PrivateRoutes>
          }
        />
    </Routes>

    </BrowserRouter>
  )
}

export default routes