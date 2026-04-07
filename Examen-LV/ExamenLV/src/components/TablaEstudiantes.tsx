export interface Estudiante {
  id: number;
  nombre: string;
  grado: string;
}

import { FaEye, FaPencil, FaTrash } from 'react-icons/fa6';

export interface Estudiante {
  id: number;
  nombre: string;
  grado: string;
  email?: string;
  matricula?: string;
  estado?: string;
}

interface TablaProps {
  estudiantes: Estudiante[];
  onDeleteClick: (id: number) => void;
}

const getInitials = (nombre: string): string => {
  return nombre
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const getAvatarColor = (id: number): string => {
  const colors = [
    '#0b7285',
    '#20b2aa',
    '#4a7ba7',
  ];
  return colors[id % colors.length];
};

export const TablaEstudiantes = ({ estudiantes, onDeleteClick }: TablaProps) => {
  return (
    <div className="tabla-container">
      {estudiantes.length === 0 ? (
        <div className="empty-state-table">
          <p>No hay estudiantes registrados.</p>
        </div>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th className="col-avatar"></th>
              <th className="col-id">ID</th>
              <th className="col-nombre">Nombre</th>
              <th className="col-grado">Grado</th>
              <th className="col-email">Contacto</th>
              <th className="col-estado">Estado</th>
              <th className="col-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((est) => (
              <tr key={est.id} className="student-row">
                <td className="col-avatar">
                  <div
                    className="table-avatar"
                    style={{ backgroundColor: getAvatarColor(est.id) }}
                  >
                    {getInitials(est.nombre)}
                  </div>
                </td>
                <td className="col-id">
                  <span className="badge-id">{est.id}</span>
                </td>
                <td className="col-nombre">
                  <span className="nombre-fuerte">{est.nombre}</span>
                </td>
                <td className="col-grado">{est.grado}</td>
                <td className="col-email">
                  {est.email && <span className="email-link">{est.email}</span>}
                </td>
                <td className="col-estado">
                  {est.estado && (
                    <span 
                      className={`badge-estado ${est.estado === 'Activa' ? 'activa' : 'inactiva'}`}
                    >
                      {est.estado}
                    </span>
                  )}
                </td>
                <td className="col-acciones">
                  <div className="acciones-grupo">
                    <button 
                      className="btn-accion btn-ver"
                      title="Ver Perfil"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="btn-accion btn-editar"
                      title="Editar"
                    >
                      <FaPencil />
                    </button>
                    <button 
                      className="btn-accion btn-eliminar"
                      title="Eliminar"
                      onClick={() => onDeleteClick(est.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};