package com.archivos.shcarthrosalud.services;

import com.archivos.shcarthrosalud.entity.PrestamoHistoria;

public interface PrestamoHistoriaService {

    public PrestamoHistoria registrarSalidaHistoria(Long idHistoria,String receptor);

    public PrestamoHistoria registrarVueltaHistoria(Long idHistoria,String devueltoPor);

}
