import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = ({onLogin}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [user, setUser] = useState(null); // Armazena os dados do usuário logado
    const [responseMessage, setResponseMessage] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        // Verificar se há um token no localStorage ao carregar a página
        const token = localStorage.getItem("token");
        if (token) {
        fetchUserDetails(token); // Buscar detalhes do usuário logado
        }
    }, []);

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
        const response = await axios.post("http://localhost:8080/users/login", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            const token = response.data.token;
            const user = response.data.user; // Dados do usuário retornados
            
            setToken(token);
            localStorage.setItem("token", token); // Salva o token no localStorage
            localStorage.setItem("user", JSON.stringify(user));
            setResponseMessage("Login efetuado com sucesso!");
            setUser(user);

            onLogin(user); 
        }
        } catch (error) {
        setResponseMessage("Erro ao conectar ao servidor ou login inválido.");
        }
    };

    const fetchUserDetails = async (token) => {
        try {
        const response = await axios.get("http://localhost:8080/users/getUserById", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(response.data); // Atualiza os dados do usuário
        } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
        setUser(null);
        }
    };

    return (
        <div>
            {/* Formulário de Login */}
            <div className="login-form">
                <h3>Faça seu Login</h3>
                {user ? (
                <div>
                    <p>Você está logado como {user.email}.</p>
                </div>
                ) : (
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">
                        Entrar
                    </button>
                </form>
                )}
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </div>
    );
};

export default LoginForm;