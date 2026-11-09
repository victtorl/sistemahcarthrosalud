package com.archivos.shcarthrosalud.controller;


import com.archivos.shcarthrosalud.dto.JwtResponseDTO;
import com.archivos.shcarthrosalud.dto.LoginRequestDTO;
import com.archivos.shcarthrosalud.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> autenticarUsuario(@RequestBody LoginRequestDTO loginRequestDTO){
        try{
            Authentication aunthentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getIdNombre(),
                            loginRequestDTO.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(aunthentication);

            String jwt = jwtService.generarToken(aunthentication);
            return ResponseEntity.ok(new JwtResponseDTO(jwt, "¡Login exitoso!"));

        } catch (Exception e){
            return  ResponseEntity.status(401).body("Error: Usuario o contraseña incorrectos.");
        }

    }

}
