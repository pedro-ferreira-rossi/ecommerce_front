import React, { useState } from 'react';
import axios from 'axios';

const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        data_nasc: '',
        password: '',
        userType: 'normal', // Novo campo para definir o tipo de usuário
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/novouser', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setResponseMessage('Usuário cadastrado com sucesso!');
            } else {
                setResponseMessage('Erro ao cadastrar usuário.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    return (
        <div className="user-account-form">
            <h3>Crie sua conta de usuário</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <div>
                    <label>Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Data Nascimento:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="data_nasc"
                        value={formData.data_nasc}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de usuário:</label>
                    <select
                        className="form-control"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="normal">Usuário Normal</option>
                        <option value="fornecedor">Fornecedor</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Criar Conta</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default UserAccountForm;