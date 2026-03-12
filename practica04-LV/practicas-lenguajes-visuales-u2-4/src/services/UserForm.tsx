// src/components/UserForm.tsx
import { useState, useEffect } from 'react';
import type { User, UserWithoutId } from '../types/User';

interface UserFormProps {
  user?: User | null;
  onSubmit: (userData: UserWithoutId) => void;
  onCancel: () => void;
}

const initialFormState: UserWithoutId = {
  name: '',
  email: '',
  phone: '',
  role: 'User',
};

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserWithoutId>(initialFormState);
  const [errors, setErrors] = useState<Partial<UserWithoutId>>({});

  useEffect(() => {
  if (!user) {
    setFormData(initialFormState);
    return;
  }

  setFormData((prev: UserWithoutId) =>
    prev.name === user.name &&
    prev.email === user.email &&
    prev.phone === user.phone &&
    prev.role === user.role
      ? prev
      : {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        }
  );
}, [user]);

  const validate = (): boolean => {
    const newErrors: Partial<UserWithoutId> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserWithoutId) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };
  return (
    <div className="user-form-wrapper">
      <div className="form-header">
        <h3>{user?.id ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
      </div>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+34 XXX XXX XXX"
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Rol</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="User">Usuario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-save">
            {user?.id ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-secondary btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;