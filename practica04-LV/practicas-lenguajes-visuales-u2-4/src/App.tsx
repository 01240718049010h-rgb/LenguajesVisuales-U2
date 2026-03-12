// src/App.tsx 
import { useState, useEffect } from 'react';
import type { User, UserWithoutId } from './types/User';
import UserTable from './components/UserTable';
import Modal from './components/Modal';
import ConfirmModal from './components/ConfirmModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userService } from './services/userServices';
import UserForm from './services/UserForm';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreate = async (userData: UserWithoutId) => {
    setLoading(true);
    try {
      const newUser = await userService.create(userData);
      setUsers(prev => [...prev, newUser]);
      showMessage('success', 'Usuario creado exitosamente');
      handleCloseFormModal();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (userData: UserWithoutId) => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      const updatedUser = await userService.update(selectedUser.id, userData);
      if (updatedUser) {
        setUsers(prev => prev.map(user => 
          user.id === selectedUser.id ? updatedUser : user
        ));
        showMessage('success', 'Usuario actualizado exitosamente');
        handleCloseFormModal();
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al actualizar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const deleted = await userService.delete(id);
      if (deleted) {
        setUsers(prev => prev.filter(user => user.id !== id));
        showMessage('success', 'Usuario eliminado exitosamente');
        setShowDeleteModal(false);
        setUserToDelete(null);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showMessage('error', 'Error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowFormModal(true);
  };

  const handleOpenCreateModal = () => {
    setSelectedUser(null);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (id: number) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete !== null) {
      handleDelete(userToDelete);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content" style={{ margin: '0 10%' }}>
          <h1>Gestión de Usuarios</h1>
          <button 
            className="btn btn-primary btn-action"
            onClick={handleOpenCreateModal}
            disabled={loading}
          >
            ➕ Nuevo Usuario
          </button>
        </div>
      </header>

      <main className="app-main">
        {message && (
          <div className={`alert alert-${message.type} alert-dismissible fade show m-3`} role="alert">
            {message.text}
            <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
          </div>
        )}

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        <div className="users-section" style={{ margin: '0 10%' }}>
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleOpenDeleteModal}
          />
        </div>
      </main>

      <Modal
        isOpen={showFormModal}
        title={selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        onClose={handleCloseFormModal}
      >
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleUpdate : handleCreate}
          onCancel={handleCloseFormModal}
        />
      </Modal>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDangerous={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />
    </div>
  );
}

export default App;