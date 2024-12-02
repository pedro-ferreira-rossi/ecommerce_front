import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [formData, setFormData] = useState({
      nome: '',
      descricao: '',
      preco: '',
      estoque: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/products/novoproduto', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          setResponseMessage('Produto cadastrado!');
        } else {
          setResponseMessage('Erro ao cadastrar produto.');
        }
      }catch (error) {
        setResponseMessage('Falha ao conectar ao servidor.');
      }
    };

    return (
      <div className="product-form">
        <h3>Cadastrar Produto</h3>
        <form onSubmit={handleSubmit} className="form-group">
          <div>
            <label>Nome:</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <input
              className="form-control"
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              className="form-control"
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Estoque:</label>
            <input
              className="form-control"
              type="number"
              name="estoque"
              value={formData.estoque}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Cadastrar</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    );
};

export default ProductForm;