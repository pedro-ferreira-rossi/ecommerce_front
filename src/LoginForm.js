import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
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
        const response = await axios.post('http://localhost:8080/users/login', formData, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            setResponseMessage('Login efetuado com sucesso!');
        } else if (response.status === 401) {
            setResponseMessage('Erro ao efetuar login.');
        }
        } catch (error) {
            setResponseMessage('Erro ao conectar ao servidor');
        }
    };
    
    return (
        <div className="login-form">
        <h3>Faça seu Login</h3>
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
            <label>Senha:</label>
            <input
                className="form-control"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Entrar</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default LoginForm;