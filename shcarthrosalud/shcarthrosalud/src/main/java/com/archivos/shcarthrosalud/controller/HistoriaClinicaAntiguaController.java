package com.archivos.shcarthrosalud.controller;

import com.archivos.shcarthrosalud.entity.HistoriaClinica;
import com.archivos.shcarthrosalud.entity.HistoriaClinicaAntigua;
import com.archivos.shcarthrosalud.enums.EstadoHistoria;
import com.archivos.shcarthrosalud.services.HistoriaClinicaAntiguaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historias-antiguas")
@CrossOrigin(origins = "*")
public class HistoriaClinicaAntiguaController {


    @Autowired
    private HistoriaClinicaAntiguaService historiaClinicaAntiguaService;

    @GetMapping("/buscar-por-inicio")
    public ResponseEntity<List<HistoriaClinicaAntigua>> buscarPorInicio(
        @RequestParam(required = false) String nombreCompleto
        ){
        List<HistoriaClinicaAntigua> result = historiaClinicaAntiguaService.BuscarHistoriasAntiguasXPrimerasLetras(nombreCompleto);
        return ResponseEntity.ok(result);
    }


    @GetMapping("/buscar-por-coincidencia")
    public ResponseEntity<List<HistoriaClinicaAntigua>> buscarPorCoincidencia(
            @RequestParam(required = false) String nombreCompleto
    ){
        List<HistoriaClinicaAntigua> result = historiaClinicaAntiguaService.BuscarHistoriasAntiguasXCoincidencia(nombreCompleto);
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/cambiar-estado")
    public ResponseEntity<HistoriaClinicaAntigua> actualizarEstado(@PathVariable Long id, @RequestParam EstadoHistoria nuevoEstado, @RequestParam Long idSolicitadoPor){
        HistoriaClinicaAntigua actualizada = historiaClinicaAntiguaService.CambiarEstadoHistoriaAntigua(id,nuevoEstado,idSolicitadoPor);
        return ResponseEntity.ok(actualizada);
    }
}
