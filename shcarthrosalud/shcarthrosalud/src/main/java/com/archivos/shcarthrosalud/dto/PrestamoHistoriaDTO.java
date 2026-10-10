package com.archivos.shcarthrosalud.dto;

import com.archivos.shcarthrosalud.enums.TipoTransaccion;

import java.time.LocalDateTime;

public class PrestamoHistoriaDTO {
    public LocalDateTime fechaPrestamo;
    public String receptorPrestamo;
    public Long idHistoria;
    public TipoTransaccion tipoTransaccion;
}
