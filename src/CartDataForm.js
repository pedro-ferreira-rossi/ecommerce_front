import React, { useState } from 'react';
import axios from 'axios';

const CartDataForm = () => {
  const [userId, setUserId] = useState('');
  const [itens, setItens] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'itens') {
      setItens(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itensJson = JSON.parse(itens);
      const response = await axios.post('http://localhost:8080/carts/novocarrinho', {
        userId,
        itens: itensJson
      });
      if (response.status === 200) {
        setResponseMessage('Carrinho criado com sucesso!');
      } else {
        setResponseMessage('Erro ao criar carrinho.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="cart-create-form">
      <h3>Criar Carrinho</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Usuário:</label>
          <input
            type="number"
            name="userId"
            value={userId}
            onChange={handleChange}
            required
          />
        </div>
        <br></br>
        <div>
          <label>Itens (JSON):</label>
          <textarea
            name="itens"
            value={itens}
            placeholder='[{"produtoId": 1, "quantidade": 2}, {"produtoId": 2, "quantidade": 3}]'
            onChange={handleChange}
            required
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">Criar Carrinho</button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default CartDataForm;
