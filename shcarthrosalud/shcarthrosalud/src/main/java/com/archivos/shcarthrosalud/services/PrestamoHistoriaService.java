package com.archivos.shcarthrosalud.services;

import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import com.archivos.shcarthrosalud.entity.Usuario;

public interface PrestamoHistoriaService {

    public PrestamoHistoria registrarSalidaHistoria(Long idHistoria,Long idreceptor);

    public PrestamoHistoria registrarVueltaHistoria(Long idHistoria, Long idDevueltoPor);

}
