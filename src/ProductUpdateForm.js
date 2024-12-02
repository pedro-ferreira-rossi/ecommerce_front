import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductUpdateForm = () => {
    const [id, setId] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const productId = window.location.pathname.split('/').pop();
        axios.get(`http://localhost:8080/products/updateproduct?id=${id}`)
        .then(response => {
            const product = response.data;
            setId(product.id);
            setFormData({
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            estoque: product.estoque
            });
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

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
            const response = await axios.put(`http://localhost:8080/products/updateproduct?id=${id}`, formData, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setResponseMessage('Produto atualizado!');
            } else {
                setResponseMessage('Erro ao atualizar produto.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    return (
        <div className="product-update-form">
            <h3>Atualizar Produto</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <div>
                    <label>ID:</label>
                    <input 
                        type="text" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        name="id"
                    />
                </div>
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
                <button type="submit" className="btn btn-primary btn-block mt-3">Atualizar</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ProductUpdateForm;