import React, { useState } from 'react';
import axios from 'axios';

const token = '123';

const PaymentDataForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        valorTotal: '',
        metodoPagamento: 'Cartão de crédito',
        status: 'Pendente'
      });
    
      const [responseMessage, setResponseMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }, error => {
        return Promise.reject(error);
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8080/payments/pagamento', formData);
          if (response.status === 200) {
            setResponseMessage('Pagamento realizado com sucesso!');
          } else {
            setResponseMessage('Erro ao realizar pagamento.');
          }
        } catch (error) {
          setResponseMessage('Falha ao conectar ao servidor.');
        }
      };
    
      return (
            <div className="pagamento-form">
                <h3>Realizar Pagamento</h3>
                <form onSubmit={handleSubmit} className="form-group">
                    <div>
                    <label>Usuário ID:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div>
                    <label>Valor Total:</label>
                    <input
                        className="form-control"
                        type="number"
                        name="valorTotal"
                        value={formData.valorTotal}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div>
                    <label>Método de Pagamento:</label>
                    <select
                        className="form-control"
                        name="metodoPagamento"
                        value={formData.metodoPagamento}
                        onChange={handleChange}
                        required
                    >
                        <option value="Cartão de crédito">Cartão de crédito</option>
                        <option value="Pix">Pix</option>
                    </select>
                    </div>
                    <div>
                    <label>Status do Pagamento:</label>
                    <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Falhado">Falhado</option>
                    </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">Realizar Pagamento</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        );
};

export default PaymentDataForm;