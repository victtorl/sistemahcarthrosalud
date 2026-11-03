package com.archivos.shcarthrosalud.services;

import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import com.archivos.shcarthrosalud.entity.PrestamoHistoriaAntigua;

public interface PrestamoHistoriaAntiguaService {

    public PrestamoHistoriaAntigua registrarSalidaHistoria(Long idHistoriaAnt, Long idreceptor);

    public PrestamoHistoriaAntigua registrarVueltaHistoria(Long idHistoriaAnt, Long idDevueltoPor);
}
