import React, { useState } from 'react';
import axios from 'axios';

const ProductDeleteForm = () => {
  const [id, setId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/products/deleteproduct?id=${id}`);
      if (response.status === 200) {
        setResponseMessage('Produto excluído!');
      } else {
        setResponseMessage('Erro ao excluir produto.');
      }
    } catch (error) {
      setResponseMessage('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="product-delete-form">
      <h3>Excluir Produto</h3>
      <div>
        <label>ID:</label>
        <input type="number" value={id} onChange={handleChange} />
        <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default ProductDeleteForm;