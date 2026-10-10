import { useState } from "react";
import { RegisterPatientFormData, registerPatientSchema } from "../lib/schemas/schemas"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import ModalPrestamo from "./ModalPrestamo";

interface HistoriaClinica {
  id?: number;
  codigoHc?: string; 
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  dni: string;
  estado:string;
  solicitadoPor:string
}


export default function BuscadorPaciente(){


  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [pacienteSeleccionado, setPacienteSeleccionado] =useState<HistoriaClinica|null>(null)


  const [resultados, setResultados] = useState<HistoriaClinica[]>([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
        reset,
    }=useForm<RegisterPatientFormData>({
    resolver: zodResolver(registerPatientSchema),

  });   


  const onSubmit = async (data: RegisterPatientFormData) => {
    try {
      const API_URL = (import.meta as any).env.VITE_API_URL;

      const params = new URLSearchParams();
       if (data.apellidoPaterno) params.append('apellidoPaterno', data.apellidoPaterno);
       if (data.apellidoMaterno) params.append('apellidoMaterno', data.apellidoMaterno);
       if (data.nombres) params.append('nombres', data.nombres);

      const urlCompleta = `${API_URL}/registrar-historia-clinica/buscar-nombre?${params.toString()}`;

      const response = await fetch(urlCompleta, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const textoRespuesta = await response.text();
      const resultadoJson: HistoriaClinica[] = JSON.parse(textoRespuesta);

      if (!response.ok) {
         toast.info('No se encontraron historias clínicas con esos filtros');
      } else {
        setResultados(resultadoJson);
        setBusquedaRealizada(true);
        toast.success(`Se encontraron ${resultadoJson.length} resultados`);
      }

      }
  
    catch (error) {
      console.error('Error de red o conexión:', error);
    }
  };
  




    
  return (

    <div className="w-auto  mx-auto p-4 space-y-8  space-x-10 flex flex-row">

    
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">

      <div className="flex flex-row gap-x-4">
        <div>
          <label className="block text-sm font-medium">Apellido Paterno</label>
          <input
            {...register('apellidoPaterno', {
              onChange(event) {
                event.target.value = event.target.value.toUpperCase()
              }
            })}
            className="w-full rounded border p-2 text-black"
          />
          {errors.apellidoPaterno && (
            <p className="mt-1 text-sm text-red-500">{errors.apellidoPaterno.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Apellido Materno</label>
          <input
            {...register('apellidoMaterno', {
              onChange(event) {
                event.target.value = event.target.value.toUpperCase()
              }
            })}
            className="w-full rounded border p-2 text-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Nombres</label>
        <input
          {...register('nombres',{onChange(event) {
            event.target.value = event.target.value.toUpperCase()
          },})}
          className="w-full rounded border p-2 text-black"
        />
      </div>



      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Buscando...' : 'Buscar'}
      </button>
        
    </form>

        {/* SECCIÓN DE RESULTADOS (TABLA) */}
      {busquedaRealizada && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 text-sm">
          <h3 className="bg-gray-100 p-4 font-bold text-gray-700 border-b">Resultados de la Búsqueda</h3>
          
          {resultados.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold border-b">
                    <th className="p-3">Código HC</th>
                    <th className="p-3">Apellido Pat</th>
                    <th className="p-3">Apellido Mat</th>
                    <th className="p-3">Nombres</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-center">Mas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {resultados.map((hc, index) => (
                    <tr key={hc.id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-blue-600">{hc.codigoHc || 'N/A'}</td>
                      <td className="p-3">{hc.apellidoPaterno}</td>
                      <td className="p-3">{hc.apellidoMaterno || '-'}</td>
                      <td className="p-3">{hc.nombres}</td>
                      <td className={`p-3 font-bold ${hc.estado === "DISPONIBLE"? "text-[#07bc0c]" : "text-red-600" }` }>{hc.estado}</td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); setPacienteSeleccionado(hc) }}
                          className={
                            ` text-white text-xs px-3 py-1.5 rounded font-medium shadow-sm transition-colors
                            ${hc.estado === "PRESTADO" ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-emerald-600 hover:bg-emerald-700' }`}
                        >
                          {hc.estado === "PRESTADO" ?'DVOLVER':'PRESTAR'}
                        </button>

                        <ModalPrestamo id="search-modal" 
                        searchId="search" 
                        modalOpen={searchModalOpen} 
                        setModalOpen={setSearchModalOpen} 
                        paciente={pacienteSeleccionado} 
                        onActualizar={handleSubmit(onSubmit)}
                        />
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No se encontraron registros</p>
              <p className="text-sm text-gray-400">Prueba ajustando los apellidos o el nombre en los filtros de arriba.</p>
            </div>
          )}
        </div>
      )}

    
  </div>
    
  );
}