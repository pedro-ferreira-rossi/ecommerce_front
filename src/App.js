import React, { useState } from 'react';
import './App.css';
import UserAccountForm from './UserAccountForm';
import LoginForm from './LoginForm';
import ProductForm from './ProductDataForm'
import SearchProduct from './SearchProduct';
import ProductUpdateForm from './ProductUpdateForm';
import ProductDeleteForm from './ProductDeleteForm';
import CartDataForm from './CartDataForm';
import CartDeleteForm from './CartDeleteForm';
import SearchCart from './SearchCart';
import PaymentDataForm from './PaymentDataForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {/* Bootstrap Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Landing Page</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('logout')}>Sair</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('produto')}>Produto</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('exibirProduto')}>Produtos Cadastrados</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('atualizarProduto')}>Editar Produtos</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('deletarProduto')}>Excluir Produtos</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('criarCarrinho')}>Criar Carrinho</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('deletarCarrinho')}>Excluir Carrinho</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('procurarCarrinho')}>Procurar Carrinho</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('pagamento')}>Pagamento</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div>
            <h1 className="display-4">Segundo Bimestre</h1>
          </div>
        )}

        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <UserAccountForm />
          </div>
        )}

        {currentPage === 'login' && (
          <div className="mt-4">
            <h2>
              <LoginForm />
            </h2>
          </div>
        )}

        {currentPage === 'logout' && (
          <div className="mt-4">
            <h2>Logout (To be implemented)</h2>
          </div>
        )}

        {currentPage === 'produto' && (
          <div className="mt-4">
            <h2>
              <ProductForm />
            </h2>
          </div>
        )}

        {currentPage === 'exibirProduto' && (
          <div className="mt-4">
            <h2>
              <SearchProduct />
            </h2>
          </div>
        )}

        {currentPage === 'atualizarProduto' && (
          <div className="mt-4">
            <h2>
              <ProductUpdateForm />
            </h2>
          </div>
        )}

        {currentPage === 'deletarProduto' && (
          <div className="mt-4">
            <h2>
              <ProductDeleteForm />
            </h2>
          </div>
        )}

        {currentPage === 'criarCarrinho' && (
          <div className="mt-4">
            <h2>
              <CartDataForm />
            </h2>
          </div>
        )}

        {currentPage === 'deletarCarrinho' && (
          <div className="mt-4">
            <h2>
              <CartDeleteForm />
            </h2>
          </div>
        )}

        {currentPage === 'procurarCarrinho' && (
          <div className="mt-4">
            <h2>
              <SearchCart />
            </h2>
          </div>
        )}

        {currentPage === 'pagamento' && (
          <div className="mt-4">
            <h2>
              <PaymentDataForm />
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
