import React, { useState } from 'react';

const FormSection = ({ onAddRecord }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRecord(formData);
        setFormData({ nombre: '', email: '', mensaje: '' });
        alert('Datos agregados a la tabla con éxito');
    };

    return (
        <div className="container my-5 p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4">Práctica 1: Entrada de Datos</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nombre@ejemplo.com"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea 
                        className="form-control" 
                        id="mensaje" 
                        name="mensaje"
                        rows="3"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Enviar Datos</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setFormData({nombre: '', email: '', mensaje: ''})}>Limpiar</button>
                </div>
            </form>

            {/* Floating Action Button (FAB) */}
            <button 
                className="btn btn-primary rounded-circle shadow-lg position-fixed" 
                style={{ bottom: '30px', right: '30px', width: '60px', height: '60px', fontSize: '24px', zIndex: 1000 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Volver Arriba"
            >
                ↑
            </button>
        </div>
    );
};

export default FormSection;
