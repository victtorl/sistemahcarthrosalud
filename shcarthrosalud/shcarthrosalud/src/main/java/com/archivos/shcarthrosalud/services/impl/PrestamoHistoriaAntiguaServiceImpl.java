package com.archivos.shcarthrosalud.services.impl;

import com.archivos.shcarthrosalud.entity.HistoriaClinicaAntigua;
import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import com.archivos.shcarthrosalud.entity.PrestamoHistoriaAntigua;
import com.archivos.shcarthrosalud.entity.Usuario;
import com.archivos.shcarthrosalud.repository.HistoriaClinicaAntiguaRepository;
import com.archivos.shcarthrosalud.repository.PrestamoHistoriaAntiguaRepository;
import com.archivos.shcarthrosalud.repository.PrestamoHistoriaRepository;
import com.archivos.shcarthrosalud.repository.UsuarioRepository;
import com.archivos.shcarthrosalud.services.PrestamoHistoriaAntiguaService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@Transactional
public class PrestamoHistoriaAntiguaServiceImpl implements PrestamoHistoriaAntiguaService {

    @Autowired
    private PrestamoHistoriaAntiguaRepository prestamoHistoriaAntiguaRepository;

    @Autowired
    private HistoriaClinicaAntiguaRepository historiaClinicaAntiguaRepository;

    @Autowired
    private  UsuarioRepository usuarioRepository;

    @Override
    public PrestamoHistoriaAntigua registrarSalidaHistoria(Long idHistoriaAnt, Long idreceptor) {
        HistoriaClinicaAntigua ha = historiaClinicaAntiguaRepository.findById(idHistoriaAnt)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"No existe la historia clinica"));

        Usuario user = usuarioRepository.findById(idreceptor)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"No existe ese usuario en la BD"));


        PrestamoHistoriaAntigua registrarPrestamo = new PrestamoHistoriaAntigua();
        registrarPrestamo.setUsuario(user);
        registrarPrestamo.setReceptorPrestamo(user.getNombre());
        registrarPrestamo.setHistoriaClinicaAntigua(ha);
        registrarPrestamo.setFechaPrestamo(LocalDateTime.now());
        return prestamoHistoriaAntiguaRepository.save(registrarPrestamo);

    }

    @Override
    public PrestamoHistoriaAntigua registrarVueltaHistoria(Long idHistoriaAnt, Long idDevueltoPor) {

        PrestamoHistoriaAntigua prestamoActivo =prestamoHistoriaAntiguaRepository.findFirstByHistoriaClinicaAntiguaIdHistoriaClinicaAntiguaAndFechaDevolucionIsNullOrderByFechaPrestamoDesc(idHistoriaAnt)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"No se encontró ningún préstamo activo para esta historia clínica"));
        Usuario user = usuarioRepository.findById(idDevueltoPor)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"No se encontró el usuario"));
        prestamoActivo.setFechaDevolucion(LocalDateTime.now());
        prestamoActivo.setDevueltoPor(user.getNombre());

        return prestamoHistoriaAntiguaRepository.save(prestamoActivo);

    }
}
