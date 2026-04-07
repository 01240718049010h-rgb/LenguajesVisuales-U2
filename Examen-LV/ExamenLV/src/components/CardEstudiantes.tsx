import { FaEye, FaPencil, FaLink, FaTrash } from 'react-icons/fa6';

export interface Estudiante {
  id: number;
  nombre: string;
  grado: string;
  email?: string;
  matricula?: string;
  estado?: string;
}

interface CardEstudiantesProps {
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
    '#2D9CCA',
    '#0B84D9',
    '#00A99D',
    '#6B9FC4',
    '#009DA8',
  ];
  return colors[id % colors.length];
};

export const CardEstudiantes = ({ estudiantes, onDeleteClick }: CardEstudiantesProps) => {
  return (
    <div className="students-grid">
      {estudiantes.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">No hay estudiantes registrados.</p>
        </div>
      ) : (
        estudiantes.map((est) => (
          <div key={est.id} className="student-card">
            <div className="card-header">
              <div
                className="avatar"
                style={{ backgroundColor: getAvatarColor(est.id) }}
              >
                {getInitials(est.nombre)}
              </div>
              <div className="student-info-header">
                <h3 className="student-name">{est.nombre}</h3>
                <p className="student-id">ID: {est.id}</p>
              </div>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span className="info-label">Grado:</span>
                <span className="info-value">{est.grado}</span>
              </div>
              {est.matricula && (
                <div className="info-row">
                  <span className="info-label">Matrícula:</span>
                  <span className="info-value">{est.matricula}</span>
                </div>
              )}
              {est.estado && (
                <div className="info-row">
                  <span className="info-label">Estado:</span>
                  <span className="info-badge" style={{
                    backgroundColor: est.estado === 'Activa' ? '#10b981' : '#ef4444',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {est.estado}
                  </span>
                </div>
              )}
              {est.email && (
                <div className="info-row">
                  <span className="info-label">Contacto:</span>
                  <span className="info-value email-text">{est.email}</span>
                </div>
              )}
            </div>

            <div className="card-actions">
              <button 
                className="action-btn action-view"
                title="Ver Perfil"
                aria-label="Ver Perfil"
              >
                <FaEye />
              </button>
              <button 
                className="action-btn action-edit"
                title="Editar"
                aria-label="Editar"
              >
                <FaPencil />
              </button>
              <button 
                className="action-btn action-link"
                title="Asignar Grado"
                aria-label="Asignar Grado"
              >
                <FaLink />
              </button>
              <button 
                className="action-btn action-delete"
                title="Eliminar"
                aria-label="Eliminar"
                onClick={() => onDeleteClick(est.id)}
              >
                <FaTrash />
              </button>
            </div>

            <button className="view-profile-btn">Ver Perfil</button>
          </div>
        ))
      )}
    </div>
  );
};
