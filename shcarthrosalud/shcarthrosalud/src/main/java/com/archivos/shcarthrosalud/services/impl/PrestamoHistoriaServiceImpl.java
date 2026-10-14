package com.archivos.shcarthrosalud.services.impl;

import com.archivos.shcarthrosalud.entity.HistoriaClinica;
import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import com.archivos.shcarthrosalud.entity.Usuario;
import com.archivos.shcarthrosalud.repository.HistoriaClinicaRepository;
import com.archivos.shcarthrosalud.repository.PrestamoHistoriaRepository;
import com.archivos.shcarthrosalud.repository.UsuarioRepository;
import com.archivos.shcarthrosalud.services.PrestamoHistoriaService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;


@Service
@Transactional
public class PrestamoHistoriaServiceImpl implements PrestamoHistoriaService {

    @Autowired
    private HistoriaClinicaRepository historiaClinicaRepository;

    @Autowired
    private PrestamoHistoriaRepository prestamoHistoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public PrestamoHistoria registrarSalidaHistoria(Long idHistoria, Long idReceptor) {
        HistoriaClinica hc = historiaClinicaRepository.findById(idHistoria)
        .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"No existe la historia clinica"));

        Usuario usuario = usuarioRepository.findById(idReceptor)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario solicitante no existe"));



        PrestamoHistoria nuevoPrestamo =new PrestamoHistoria();
        nuevoPrestamo.setUsuario(usuario);
        nuevoPrestamo.setReceptorPrestamo(usuario.getNombre());
        nuevoPrestamo.setHistoriaClinica(hc);
        nuevoPrestamo.setFechaPrestamo(LocalDateTime.now());
        return prestamoHistoriaRepository.save(nuevoPrestamo);

    }

    @Override
    public PrestamoHistoria registrarVueltaHistoria(Long idHistoria,Long idDevueltoPor) {
        PrestamoHistoria prestamoActivo = prestamoHistoriaRepository.findFirstByHistoriaClinicaIdHistoriaAndFechaDevolucionIsNullOrderByFechaPrestamoDesc(idHistoria)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró ningún préstamo activo para esta historia clínica"
                ));
        Usuario usuario = usuarioRepository.findById(idDevueltoPor)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario solicitante no existe"));

           prestamoActivo.setFechaDevolucion(LocalDateTime.now());
           prestamoActivo.setDevueltoPor(usuario.getNombre());

           return prestamoHistoriaRepository.save(prestamoActivo);
    }
}
