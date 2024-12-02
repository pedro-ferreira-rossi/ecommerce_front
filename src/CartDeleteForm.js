import React, { useState } from 'react';
import axios from 'axios';

const CartDeleteForm = () => {
  const [id, setId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/carts/deletecart?id=${id}`);
      if (response.status === 200) {
        setResponseMessage('Carrinho excluído!');
      } else {
        setResponseMessage('Erro ao excluir carrinho.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="cart-delete-form">
      <h3>Excluir Carrinho</h3>
      <div>
        <label>ID:</label>
        <input type="number" value={id} onChange={handleChange} />
        <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CartDeleteForm;