import { useState } from 'react';
import { FaChartLine, FaUsers, FaChalkboardUser, FaGraduationCap, FaClipboardList, FaGears } from 'react-icons/fa6';

interface SidebarProps {
  seccionActiva: string;
  onSectionChange: (seccion: string) => void;
}

export const Sidebar = ({ seccionActiva, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
    { id: 'alumnos', label: 'Gestión de Alumnos', icon: FaUsers },
    { id: 'profesores', label: 'Profesores', icon: FaChalkboardUser },
    { id: 'grados', label: 'Grados', icon: FaGraduationCap },
    { id: 'asistencia', label: 'Asistencia', icon: FaClipboardList },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${seccionActiva === item.label ? 'active' : ''}`}
              onClick={() => onSectionChange(item.label)}
              title={item.label}
            >
              <IconComponent className="sidebar-icon" />
              {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button 
          className={`sidebar-item ${seccionActiva === 'Configuración' ? 'active' : ''}`}
          onClick={() => onSectionChange('Configuración')}
          title="Configuración"
        >
          <FaGears className="sidebar-icon" />
          {!isCollapsed && <span className="sidebar-label">Configuración</span>}
        </button>
      </div>
    </div>
  );
};
