import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import {  prestamoSchema } from '../lib/schemas/schemas';
import { toast } from 'react-toastify';





function ModalPrestamo({
  id,
  searchId,
  modalOpen,
  setModalOpen,
  paciente,
  onActualizar
}) {


    const {
          register,
          handleSubmit,
          formState:{errors,isSubmitting},
          reset,
      }=useForm({
      resolver: zodResolver(prestamoSchema),
      defaultValues: {
        solicitadoPor: ''
      }
    });

    const solicitantes = [
      { id: "1", nombre: "ESTHER" },
      { id: "2", nombre: "VALERIA" },
      { id: "3", nombre: "INGRID" },
      { id: "4", nombre: "FANNY" },
      { id: "4", nombre: "ZENIA" },
      { id: "4", nombre: "VANESSA" }
    ];

    
    const onSubmit = async (data) => {


      if(!paciente || !paciente.idHistoria){
        toast.error('No se ha seleccionado ninguna historia clínica válida');
        return
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const params = new URLSearchParams();
        params.append('nuevoEstado', paciente?.estado === 'PRESTADO' ? 'DISPONIBLE' : 'PRESTADO')
        params.append('solicitadoPor',data.solicitadoPor)

        const urlCompleta = `${API_URL}/registrar-historia-clinica/${paciente.idHistoria}/cambiar-estado?${params.toString()}`;


        const response = await fetch(urlCompleta, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const textoRespuesta = await response.text();
    
        if (!response.ok) {
      // Limpiamos el texto por si incluye el prefijo '400 BAD_REQUEST'
          const mensajeLimpio = textoRespuesta
            .replace(/^[0-9]{3}\s+[A-Z_]+\s*"?/, '') // Elimina '400 BAD_REQUEST "'
            .replace(/"$/, '');                       // Elimina las comillas del final
    
          toast.error(mensajeLimpio || 'Error al procesar el préstamo');
          return;
        }

        // 3. Si la respuesta fue exitosa
        toast.success('¡Historia clínica prestada, ojala vuelva!');
        console.log('Respuesta del servidor:');
             if (onActualizar) {
                await onActualizar(); 
              }
        reset();
        setModalOpen(false)
      } 
      catch (error) {
        console.error('Error de red o conexión:', error);
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
  },[modalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {

  }, [modalOpen]);

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
          className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          {/* Search form */}
          <form className="border-b border-gray-200 dark:border-gray-700/60">
   
            {/* DATOS DEL PACIENTE */}
          </form>
          <div className="py-4 px-2">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">Datos del paciente</div>
              <ul className="text-sm">
                <li>
                  <div
                    className="flex items-center  p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                  >
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2">Apellido Paterno</div>
                    <span>{paciente?.apellidoPaterno}</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center  p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                  >
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2">Apellido Materno</div>
                    <span>{paciente?.apellidoMaterno}</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center  p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                  >
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2">Nombres</div>
                    <span>{paciente?.nombres}</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center  p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                  >
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2">Estado</div>
                    <span>{paciente?.estado}</span>
                  </div>
                </li>
                 <li>
                  <div
                    className="flex items-center  p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                  >
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2">DNI / CE</div>
                    <span>{paciente?.dni}</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center  p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                  >
                    <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2">Asignado a</div>
                    <span className={paciente?.estado === "PRESTADO" ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-400 dark:text-gray-500 italic"}
                    >{ paciente?.estado === "PRESTADO" ? paciente?.solicitadoPor :'NADIE' }
                    </span>
                  </div>
                </li>
             
              </ul>
            </div>
            {/* Recent pages */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">REALIZAR PRESTAMO</div>
              {/* <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                  className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium">Messages</span> -{' '}
                      <span className="text-gray-600 dark:text-gray-400">Conversation / … / Mike Mills</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                    to="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                  className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium">Messages</span> -{' '}
                      <span className="text-gray-600 dark:text-gray-400">Conversation / … / Eva Patrick</span>
                    </span>
                  </Link>
                </li>
              </ul> */}

                  <form onSubmit={handleSubmit(onSubmit)}  className="max-w-sm mx-auto">
                      {/* <label  className="sr-only">¿Quien solicita la historia?</label> */}
                      <select 
                        id="underline_select" 
                        {...register('solicitadoPor')}
                        className="block py-2.5 ps-0 w-full text-sm text-body bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer text-black dark:text-white"
                      >
                        {/* Opción deshabilitada por defecto para forzar a elegir una válida */}
                        <option value="" disabled >{paciente?.estado==='PRESTADO'?'¿Quién devuelve la historia?':'¿Quién solicita la historia?'}</option>
                        
                        {/* 3. 🔄 MAPEAMOS EL ARRAY AQUÍ */}
                        {solicitantes.map((medico,i) => (
                          <option key={i} value={medico.nombre}>
                            {medico.nombre}
                          </option>
                        ))}
                      </select>

                      {errors.solicitadoPor && (
                          <p className="mt-1 text-xs text-red-500">{errors.solicitadoPor.message}</p>
                        )}



                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full rounded  p-2 text-white  disabled:opacity-50
                            ${paciente?.estado === "PRESTADO" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                          {isSubmitting ? 'Enviando...' :paciente?.estado==="PRESTADO" ? 'DEVOLVER' : 'PRESTAR' }
                        </button>

                  </form>
                                      
      

            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalPrestamo;
