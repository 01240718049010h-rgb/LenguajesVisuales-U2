// src/components/UserTable.tsx
import { useState } from 'react';
import type { User } from '../types/User';
import SearchBar from './SearchBar';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay usuarios registrados</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '0 10%' }}>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron usuarios con el término de búsqueda</p>
        </div>
      ) : (
        <div>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : 'bg-info'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(user)}
                      title="Editar usuario"
                    >
                      ✎ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(user.id)}
                      title="Eliminar usuario"
                    >
                      🗑 Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;