import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Opcional si usas React Router
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate(); // Hook para redirigir tras un login exitoso
  const [idNombre, setIdNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idNombre, password }),
      });

      if (!response.ok) {
        throw new Error('ID de usuario o contraseña incorrectos.');
      }

      if(response.status == 200){
        toast.success('Bienvenido a SHCA')
      }

      const data = await response.json(); // O .json() dependiendo de cómo devuelvas la respuesta
      console.log('Login exitoso:', data);
      console.log('Login exitoso:', response);
      
      // Aquí puedes guardar el token o estado de sesión y redirigir al dashboard
      localStorage.setItem('token', data.token);
       navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      
      {/* Contenedor principal de la tarjeta de Login */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700/60">
        
        {/* Cabecera del formulario */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">SHC ArthrosaSalud</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Ingrese su ID de usuario y contraseña para acceder
          </p>
        </div>

        {/* Mensaje de Error si las credenciales fallan */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo ID de Usuario */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="idNombre">
              ID Nombre
            </label>
            <input
              id="idNombre"
              type="text"
              value={idNombre}
              onChange={(e) => setIdNombre(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="nick name"
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Pie de página de la tarjeta */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Sistema de Archivo de Historias Clínicas
        </div>
      </div>
    </main>
  );
}

export default Login;