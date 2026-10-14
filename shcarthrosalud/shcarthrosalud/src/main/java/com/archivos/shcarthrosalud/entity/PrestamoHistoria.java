package com.archivos.shcarthrosalud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prestamo_historia")
public class PrestamoHistoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prestamo")
    private Long idPrestamo;

    @Column(name = "receptor_prestamo", nullable = false, length = 50)
    private String receptorPrestamo;

    @Column(name = "devuelto_por",nullable = true,length = 50)
    private String devueltoPor;

    @Column(name = "fecha_prestamo")
    private LocalDateTime fechaPrestamo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario",nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_devolucion",nullable = true)
    private LocalDateTime fechaDevolucion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_historia",nullable = false)
    private HistoriaClinica historiaClinica;




}
