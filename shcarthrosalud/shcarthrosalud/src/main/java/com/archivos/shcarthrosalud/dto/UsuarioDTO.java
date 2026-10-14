package com.archivos.shcarthrosalud.dto;

import com.archivos.shcarthrosalud.enums.TipoUsuario;
import lombok.Data;

@Data
public class UsuarioDTO {
    private String nombre;
    private TipoUsuario tipoUsuario;
}
