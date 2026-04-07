import { FaBell, FaGears, FaBook } from 'react-icons/fa6';

interface NavbarProps {
  seccionActiva: string;
  usuarioNombre?: string;
  usuarioInicial?: string;
}

export const Navbar = ({ 
  seccionActiva, 
  usuarioNombre = 'Usuario Desconocido',
  usuarioInicial = 'UD',
}: NavbarProps) => {
  return (
    <header className="navbar-top">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand-section">
          <div className="logo-icon">
            <FaBook className="logo-book" />
          </div>
          <span className="navbar-brand">Sistema Escolar</span>
        </div>

        {/* Centro - Sección Activa */}
        <div className="navbar-center">
          <span className="navbar-section">Sección: <strong>{seccionActiva}</strong></span>
        </div>

        {/* Derecha - Usuario e Iconos */}
        <div className="navbar-right">
          <div className="user-info-compact">
            <div className="user-avatar-small">
              {usuarioInicial}
            </div>
            <span className="user-name-small">{usuarioNombre}</span>
          </div>
          
          <div className="navbar-icons">
            <button 
              className="navbar-icon-btn" 
              title="Notificaciones"
            >
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <button 
              className="navbar-icon-btn" 
              title="Configuración"
            >
              <FaGears />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};