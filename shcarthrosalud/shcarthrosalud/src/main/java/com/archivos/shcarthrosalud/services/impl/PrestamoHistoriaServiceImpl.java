package com.archivos.shcarthrosalud.services.impl;

import com.archivos.shcarthrosalud.entity.HistoriaClinica;
import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import com.archivos.shcarthrosalud.repository.HistoriaClinicaRepository;
import com.archivos.shcarthrosalud.repository.PrestamoHistoriaRepository;
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

    @Override
    public PrestamoHistoria registrarSalidaHistoria(Long idHistoria, String receptor) {
        HistoriaClinica hc = historiaClinicaRepository.findById(idHistoria)
        .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"No existe la historia clinica"));

        PrestamoHistoria nuevoPrestamo =new PrestamoHistoria();
        nuevoPrestamo.setReceptorPrestamo(receptor);
        nuevoPrestamo.setHistoriaClinica(hc);

        return prestamoHistoriaRepository.save(nuevoPrestamo);

    }

    @Override
    public PrestamoHistoria registrarVueltaHistoria(Long idHistoria,String devueltoPor) {
        PrestamoHistoria prestamoActivo = prestamoHistoriaRepository.findFirstByHistoriaClinicaIdHistoriaAndFechaDevolucionIsNullOrderByFechaPrestamoDesc(idHistoria)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró ningún préstamo activo para esta historia clínica"
                ));

           prestamoActivo.setFechaDevolucion(LocalDateTime.now());
           prestamoActivo.setDevueltoPor(devueltoPor);

           return prestamoHistoriaRepository.save(prestamoActivo);
    }
}
