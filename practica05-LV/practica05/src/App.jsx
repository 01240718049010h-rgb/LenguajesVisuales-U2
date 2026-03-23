import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import FormSection from './components/FormSection'
import TableSection from './components/TableSection'
import ProgressSection from './components/ProgressSection'

function App() {
  const [records, setRecords] = useState([
    { id: 1, name: 'Proyecto A', status: 'Completado', date: '2025-01-10' },
    { id: 2, name: 'Proyecto B', status: 'En Progreso', date: '2025-02-15' },
    { id: 3, name: 'Proyecto C', status: 'Pendiente', date: '2025-03-01' },
  ]);

  const handleAddRecord = (newEntry) => {
    const recordToAdd = {
      id: records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1,
      name: newEntry.nombre,
      status: 'Pendiente',
      date: new Date().toISOString().split('T')[0]
    };
    setRecords([recordToAdd, ...records]);
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este registro?')) {
      setRecords((prevRecords) => prevRecords.filter(record => record.id !== id));
    }
  };

  return (
    <div className="min-vh-100 bg-light-subtle pb-5">
      {/* Header */}
      <header className="bg-dark text-white py-4 mb-5 shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img src={reactLogo} width="40" height="40" alt="React logo" className="animate-spin" />
            <h1 className="h3 mb-0">React + Bootstrap: Prácticas Progresivas</h1>
          </div>
          <span className="badge bg-primary px-3 py-2">Unidad 2 - Practica 05</span>
        </div>
      </header>

      <main className="container">
        <div className="row g-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm overflow-hidden">
              <ProgressSection />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <FormSection onAddRecord={handleAddRecord} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <TableSection records={records} onDeleteRecord={handleDeleteRecord} />
            </div>
          </div>
        </div>
      </main>

      <footer className="container text-center mt-5 pt-4 border-top text-muted">
        <p>© 2026 - Desarrollo de Interfaces de Usuario con React y Bootstrap</p>
      </footer>
    </div>
  )
}

export default App
