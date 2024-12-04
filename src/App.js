import React, { useState, useEffect } from 'react';
import './App.css';
import UserAccountForm from './UserAccountForm';
import LoginForm from './LoginForm';
import ProductForm from './ProductDataForm';
import SearchProduct from './SearchProduct';
import ProductUpdateForm from './ProductUpdateForm';
import ProductDeleteForm from './ProductDeleteForm';
import CartDataForm from './CartDataForm';
import CartDeleteForm from './CartDeleteForm';
import SearchCart from './SearchCart';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null); // Armazenar o estado do usuário

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('landing');
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Landing Page</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {user ? (
              user.userType === 'normal' ? (
                <>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={() => handleNavClick('searchProduct')}>Pesquisar Produtos</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={() => handleNavClick('carrinho')}>Carrinho</button>
                  </li>
                </>
              ) : user.userType === 'fornecedor' ? (
                <>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={() => handleNavClick('addProduct')}>Adicionar Produto</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={() => handleNavClick('updateProduct')}>Atualizar Produto</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={() => handleNavClick('deleteProduct')}>Excluir Produto</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={() => handleNavClick('searchProduct')}>Ver Produtos</button>
                  </li>
                </>
              ) : (
                <p className="nav-link">Usuário não autorizado.</p>
              )
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('cadastro')}>Cadastro</button>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>Sair</button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {currentPage === 'landing' && (
        <div>
          <h2>Bem-vindo à página inicial</h2>
          <button onClick={() => handleNavClick('login')}>Login</button>
        </div>
      )}
      {currentPage === 'cadastro' && <UserAccountForm />}
      {currentPage === 'login' && <LoginForm onLogin={handleLogin} />}
      {currentPage === 'searchProduct' && user?.userType === 'normal' && <SearchProduct />}
      {currentPage === 'carrinho' && user?.userType === 'normal' && (
        <div>
          <h3>Gerenciamento do Carrinho</h3>
          <br></br>
          <CartDataForm />
          <br></br>
          <br></br>
          <br></br>
          <CartDeleteForm />
          <br></br>
          <br></br>
          <br></br>
          <SearchCart />
        </div>
      )
      }
      {currentPage === 'addProduct' && user?.userType === 'fornecedor' && <ProductForm />}
      {currentPage === 'updateProduct' && user?.userType === 'fornecedor' && <ProductUpdateForm />}
      {currentPage === 'deleteProduct' && user?.userType === 'fornecedor' && <ProductDeleteForm />}
      {currentPage === 'searchProduct' && user?.userType === 'fornecedor' && <SearchProduct />}
      {currentPage !== 'landing' && !user && (
        <div>
          <br></br>
          <br></br>
          <p>Você precisa estar logado para acessar o restante das páginas.</p>
          <p>Caso ainda não tenha uma conta clique em "Cadastro" e se cadastre.</p>
        </div>
      )}
    </div>
  );
}

export default App;