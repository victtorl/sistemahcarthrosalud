package com.archivos.shcarthrosalud.services.impl;

import com.archivos.shcarthrosalud.entity.HistoriaClinica;
import com.archivos.shcarthrosalud.entity.HistoriaClinicaAntigua;
import com.archivos.shcarthrosalud.entity.Usuario;
import com.archivos.shcarthrosalud.enums.EstadoHistoria;
import com.archivos.shcarthrosalud.repository.HistoriaClinicaAntiguaRepository;
import com.archivos.shcarthrosalud.repository.PrestamoHistoriaAntiguaRepository;
import com.archivos.shcarthrosalud.repository.UsuarioRepository;
import com.archivos.shcarthrosalud.services.HistoriaClinicaAntiguaService;
import com.archivos.shcarthrosalud.services.PrestamoHistoriaAntiguaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class HistoriaClinicaAntiguaServiceImpl implements HistoriaClinicaAntiguaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PrestamoHistoriaAntiguaService prestamoHistoriaAntiguaService;

    @Autowired
    private HistoriaClinicaAntiguaRepository historiaClinicaAntiguaRepository;

    @Override
    public List<HistoriaClinicaAntigua> ListarHistoriasAntiguas() {
        return historiaClinicaAntiguaRepository.findAll();
    }

    @Override
    public List<HistoriaClinicaAntigua> BuscarHistoriasAntiguasXCoincidencia(String coincidenciaNombre) {
        return historiaClinicaAntiguaRepository.buscarPorCoincidenciaNombre(coincidenciaNombre);
    }

    @Override
    public List<HistoriaClinicaAntigua> BuscarHistoriasAntiguasXPrimerasLetras(String primerasLetras) {
        return historiaClinicaAntiguaRepository.buscarPorPrimerasLetras(primerasLetras);
    }



    @Override
    public HistoriaClinicaAntigua CambiarEstadoHistoriaAntigua(Long idHistoria, EstadoHistoria nuevoEstado, Long idResponsableHistoria){
        HistoriaClinicaAntigua ha = historiaClinicaAntiguaRepository.findById(idHistoria)
                .orElseThrow(()-> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró la historia con ID" + idHistoria
                ));

        // 🛡️ Candado de seguridad: Evita registrar un préstamo sobre algo ya prestado
        if (nuevoEstado == EstadoHistoria.PRESTADO && ha.getEstado() == EstadoHistoria.PRESTADO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La historia ya está prestada a: " + ha.getSolicitadoPor());
        }

        Usuario responsable = usuarioRepository.findById(idResponsableHistoria)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "El usuario con ID " + idResponsableHistoria + " no existe"
                ));

        //  NUEVO ESTADO ES EL FRONT LA INTENCION EN ESTE CASO SI EL USUARIO QUIERE QUE ESTE DISPONIBLE HACEMOS ESTO
        if(nuevoEstado == EstadoHistoria.DISPONIBLE){
            ha.setSolicitadoPor(null);
            prestamoHistoriaAntiguaService.registrarVueltaHistoria(idHistoria,idResponsableHistoria);
        }else if(nuevoEstado == EstadoHistoria.PRESTADO){
            ha.setSolicitadoPor(responsable.getNombre());
            prestamoHistoriaAntiguaService.registrarSalidaHistoria(idHistoria,idResponsableHistoria);
        }

        ha.setEstado(nuevoEstado);

        return historiaClinicaAntiguaRepository.save(ha);
    }
}
