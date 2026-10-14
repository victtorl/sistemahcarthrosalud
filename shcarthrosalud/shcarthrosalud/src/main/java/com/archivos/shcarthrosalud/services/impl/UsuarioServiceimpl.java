package com.archivos.shcarthrosalud.services.impl;

import com.archivos.shcarthrosalud.entity.Usuario;
import com.archivos.shcarthrosalud.repository.UsuarioRepository;
import com.archivos.shcarthrosalud.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UsuarioServiceimpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
}
