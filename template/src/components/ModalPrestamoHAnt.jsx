import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { prestamoSchema } from '../lib/schemas/schemas';
import { toast } from 'react-toastify';
import { useUsuarios } from '../contexts/UsuarioContext';

function ModalPrestamoHAnt({
  id,
  searchId,
  modalOpen,
  setModalOpen,
  paciente,
  onActualizar
}) {

  // 1. Consumimos los usuarios cargados globalmente desde el contexto
  const { usuarios, cargandoUsuarios } = useUsuarios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(prestamoSchema),
    defaultValues: {
      solicitadoPor: ''
    }
  });

  const onSubmit = async (data) => {
    if (!paciente || !paciente.idHistoriaClinicaAntigua) {
      console.log(paciente)
      toast.error('No se ha seleccionado ninguna historia clínica válida');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token');

      const params = new URLSearchParams();
      params.append('nuevoEstado', paciente?.estado === 'PRESTADO' ? 'DISPONIBLE' : 'PRESTADO');
      params.append('idSolicitadoPor', data.solicitadoPor);

      const urlCompleta = `${API_URL}/historias-antiguas/${paciente.idHistoriaClinicaAntigua}/cambiar-estado?${params.toString()}`;

      const response = await fetch(urlCompleta, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      const textoRespuesta = await response.text();

      if (!response.ok) {
        const mensajeLimpio = textoRespuesta
          .replace(/^[0-9]{3}\s+[A-Z_]+\s*"?/, '') // Elimina '400 BAD_REQUEST "'
          .replace(/"$/, '');                       // Elimina las comillas del final

        toast.error(mensajeLimpio || 'Error al procesar el préstamo');
        return;
      }
      if(paciente?.estado=='DISPONIBLE')
      toast.success('¡Historia clínica prestada, ojala vuelva!');
      if(paciente?.estado=='PRESTADO')
      toast.success('¡Historia clínica vuelve a estar disponible mi king!');
      if (onActualizar) {
        await onActualizar();
      }
      reset();
      setModalOpen(false);
    } catch (error) {
      console.error('Error de red o conexión:', error);
      toast.error('No se pudo conectar con el servidor');
    }
  };

  const modalContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (!modalOpen || !modalContent.current) return;
      if (modalContent.current.contains(event.target)) return;
      if (event.target.className && typeof event.target.className === 'string') {
        if (!event.target.className.includes('fixed') && !event.target.className.includes('inset-0')) {
          return;
        }
      }
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [modalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900/30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          <div className="py-4 px-4">
            {/* DATOS DEL PACIENTE */}
            <div className="mb-4 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase px-2 mb-3">
                Datos del paciente
              </div>
              
              <ul className="text-sm space-y-1">
                <li>
                  <div className="flex items-center justify-between p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Nombre Completo</div>
                    <span className="font-medium text-gray-900 dark:text-white">{paciente?.nombreCompleto || '-'}</span>
                  </div>
                </li>
        

                <li>
                  <div className="flex items-center justify-between p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Estado</div>
                    <span className="font-medium text-gray-900 dark:text-white">{paciente?.estado || '-'}</span>
                  </div>
                </li>

                <li>
                  <div className="flex items-center justify-between p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">DNI / CE</div>
                    <span className="font-medium text-gray-900 dark:text-white">{paciente?.dni || '-'}</span>
                  </div>
                </li>

                <li>
                  <div className="flex items-center justify-between p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Asignado a</div>
                    <span className={paciente?.estado === "PRESTADO" ? "text-gray-900 dark:text-white font-medium" : "text-gray-400 dark:text-gray-400 italic"}>
                      {paciente?.estado === "PRESTADO" ? paciente?.solicitadoPor : 'NADIE'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* SECCIÓN FORMULARIO PRESTAMO */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/60">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase px-2 mb-3">
                REALIZAR PRÉSTAMO
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-4">
                <div>
                  <select 
                    id="underline_select" 
                    {...register('solicitadoPor')}
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                  >
                    <option value="" disabled className="bg-white dark:bg-gray-800 text-gray-500">
                      {paciente?.estado === 'PRESTADO' ? '¿Quién devuelve la historia?' : '¿Quién solicita la historia?'}
                    </option>

                    {usuarios.map((u) => (
                      <option key={u.idUsuario} value={u.idUsuario} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        {u.nombre} [{u.tipoUsuario}]
                      </option>
                    ))}
                  </select>

                  {errors.solicitadoPor && (
                    <p className="mt-1 text-xs text-red-500">{errors.solicitadoPor.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded p-2 text-white font-medium transition-colors disabled:opacity-50
                    ${paciente?.estado === "PRESTADO" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {isSubmitting ? 'Enviando...' : paciente?.estado === "PRESTADO" ? 'DEVOLVER' : 'PRESTAR'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalPrestamoHAnt;