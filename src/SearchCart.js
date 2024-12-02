import React, { useState } from 'react';
import axios from 'axios';

const SearchCart = () => {
  const [id, setId] = useState('');
  const [carrinho, setCarrinho] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleFind = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/carts/consultarCarrinho?id=${id}`);
      if (response.status === 200) {
        setCarrinho(response.data);
        setResponseMessage('');
      } else {
        setResponseMessage('Carrinho não encontrado.');
        setCarrinho(null);
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
      setCarrinho(null);
    }
  };

  return (
    <div className="carrinho-find-form">
      <h3>Encontrar Carrinho</h3>
      <div>
        <label>ID:</label>
        <input type="number" value={id} onChange={handleChange} />
        <button onClick={handleFind} className="btn btn-primary">Encontrar</button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
      {carrinho && (
        <div className="carrinho-info">
          <h4>Informações do Carrinho</h4>
          <p>ID: {carrinho.id}</p>
          <p>Usuário ID: {carrinho.userId}</p>
          <p>Itens: {JSON.stringify(carrinho.itens)}</p>
        </div>
      )}
    </div>
  );
};

export default SearchCart;