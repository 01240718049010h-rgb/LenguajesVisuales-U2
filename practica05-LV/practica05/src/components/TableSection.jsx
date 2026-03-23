import React, { useState } from 'react';

const TableSection = ({ records, onDeleteRecord }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleConfirmDelete = (id) => {
        onDeleteRecord(id);
    };

    return (
        <div className="container my-5 p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4">Práctica 2: Estructura y Presentación de Datos</h2>
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombre del Proyecto</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <span className={`badge ${item.status === 'Completado' ? 'bg-success' : item.status === 'En Progreso' ? 'bg-warning' : 'bg-secondary'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{item.date}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button 
                                            className="btn btn-sm btn-info text-white" 
                                            onClick={() => handleOpenModal(item)}
                                        >
                                            Ver Detalles
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger" 
                                            onClick={() => handleConfirmDelete(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bootstrap Modal (handled via React State) */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Detalles del Proyecto</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {selectedItem && (
                                    <div className="p-3">
                                        <p><strong>ID:</strong> {selectedItem.id}</p>
                                        <p><strong>Nombre:</strong> {selectedItem.name}</p>
                                        <p><strong>Estado:</strong> {selectedItem.status}</p>
                                        <p><strong>Fecha de Creación:</strong> {selectedItem.date}</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableSection;
