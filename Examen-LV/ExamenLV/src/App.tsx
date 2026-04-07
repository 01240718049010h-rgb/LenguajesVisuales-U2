import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TablaEstudiantes } from './components/TablaEstudiantes';
import type { Estudiante } from './components/TablaEstudiantes';
import { ModalConfirm } from './components/ModalConfirm';
import { FaMagnifyingGlass, FaSliders, FaCirclePlus } from 'react-icons/fa6';

function App() {
  // Estado de datos
  const [searchTerm, setSearchTerm] = useState('');
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    { 
      id: 1, 
      nombre: 'Ana García', 
      grado: '3ro Básico',
      email: 'ana.garcia@email.com',
      matricula: 'Activa',
      estado: 'Activa'
    },
    { 
      id: 2, 
      nombre: 'Carlos López', 
      grado: '1ro Medio',
      email: 'carlos.lopez@email.com',
      matricula: 'Activa',
      estado: 'Activa'
    },
    { 
      id: 3, 
      nombre: 'María Fernández', 
      grado: '4to Medio',
      email: 'maria.fernandez@email.com',
      matricula: 'Activa',
      estado: 'Activa'
    },
  ]);

  // Estados para Modal
  const [showModal, setShowModal] = useState(false);
  const [estudianteAEliminar, setEstudianteAEliminar] = useState<number | null>(null);

  // Funciones de control
  const prepararEliminacion = (id: number) => {
    setEstudianteAEliminar(id);
    setShowModal(true);
  };

  const confirmarEliminacion = () => {
    if (estudianteAEliminar !== null) {
      setEstudiantes(estudiantes.filter(est => est.id !== estudianteAEliminar));
    }
    setShowModal(false);
    setEstudianteAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setShowModal(false);
    setEstudianteAEliminar(null);
  };

  const estudiantesFiltrados = estudiantes.filter(est =>
    est.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.id.toString().includes(searchTerm) ||
    est.grado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-wrapper">
      <Navbar 
        seccionActiva="Gestión de Alumnos"
        usuarioNombre="Ana García"
        usuarioInicial="AG"
      />
      
      <main className="main-container">
        <div className="content-box">
          {/* Header */}
          <div className="page-header">
            <div>
              <h1>Lista de Estudiantes</h1>
              <p className="header-subtitle">Total de Alumnos: {estudiantes.length}</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar-section">
            <div className="search-bar">
              <FaMagnifyingGlass className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nombre, ID o grado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="toolbar-buttons">
              <button className="btn btn-secondary">
                <FaSliders /> Filtros
              </button>
              <button className="btn btn-primary">
                <FaCirclePlus /> Nuevo Alumno
              </button>
            </div>
          </div>

          {/* Tabla */}
          <TablaEstudiantes 
            estudiantes={estudiantesFiltrados} 
            onDeleteClick={prepararEliminacion}
          />
        </div>
      </main>

      {/* Modal */}
      <ModalConfirm 
        show={showModal} 
        onClose={cancelarEliminacion} 
        onConfirm={confirmarEliminacion} 
      />
    </div>
  );
}

export default App;