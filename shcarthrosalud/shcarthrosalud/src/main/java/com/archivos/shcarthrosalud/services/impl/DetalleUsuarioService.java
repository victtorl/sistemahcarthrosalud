package com.archivos.shcarthrosalud.services.impl;

import com.archivos.shcarthrosalud.entity.Usuario;
import com.archivos.shcarthrosalud.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class DetalleUsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String idNombre) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByIdNombre(idNombre)
                .orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado"));

        String rol = (usuario.getTipoUsuario() != null) ? usuario.getTipoUsuario().toString() : "SOLICITANTE";

        return org.springframework.security.core.userdetails.User.builder()
                .username(usuario.getIdNombre())
                .password(usuario.getPassword())
                .roles(rol)
                .build();
    }
}
