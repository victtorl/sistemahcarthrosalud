package com.archivos.shcarthrosalud.services;


import com.archivos.shcarthrosalud.entity.HistoriaClinica;
import com.archivos.shcarthrosalud.entity.HistoriaClinicaAntigua;
import com.archivos.shcarthrosalud.enums.EstadoHistoria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface HistoriaClinicaAntiguaService {

    List<HistoriaClinicaAntigua> ListarHistoriasAntiguas();

    List<HistoriaClinicaAntigua> BuscarHistoriasAntiguasXCoincidencia(String coincidenciaNombre);

    List<HistoriaClinicaAntigua> BuscarHistoriasAntiguasXPrimerasLetras(String primerasLetras);

    HistoriaClinicaAntigua CambiarEstadoHistoriaAntigua(Long id, EstadoHistoria estado, Long solicitadoPor);
}
