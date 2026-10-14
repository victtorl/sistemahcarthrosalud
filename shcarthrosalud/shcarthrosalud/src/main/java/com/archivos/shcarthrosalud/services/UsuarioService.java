package com.archivos.shcarthrosalud.services;

import com.archivos.shcarthrosalud.dto.UsuarioDTO;
import com.archivos.shcarthrosalud.entity.Usuario;
import com.archivos.shcarthrosalud.repository.UsuarioRepository;
import com.sun.jdi.InterfaceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UsuarioService {

    List<Usuario> listarTodos();
}