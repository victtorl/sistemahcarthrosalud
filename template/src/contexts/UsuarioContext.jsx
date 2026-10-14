import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Inicializar el contexto
const UsuarioContext = createContext();

// 2. Crear el Proveedor Global
export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);

  useEffect(() => {
    const cargarUsuariosDelBackend = async () => {
      try {
        // Obtenemos la URL base de tus variables de entorno
        const API_URL = import.meta.env.VITE_API_URL;

        // 🔥 REEMPLAZADO: Usamos fetch en lugar de axios
        const response = await fetch(`${API_URL}/usuarios`);
        
        if (!response.ok) {
          throw new Error(`Error en el servidor: ${response.status}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error global al cargar usuarios con fetch:", error);
      } finally {
        setCargandoUsuarios(false);
      }
    };
    
    cargarUsuariosDelBackend();
  }, []); // Solo se ejecuta una vez al iniciar la app

  return (
    <UsuarioContext.Provider value={{ usuarios, cargandoUsuarios }}>
      {children}
    </UsuarioContext.Provider>
  );
}

// 3. Crear el Hook personalizado para usarlo fácilmente
export function useUsuarios() {
  return useContext(UsuarioContext);
}