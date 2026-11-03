package com.archivos.shcarthrosalud.entity;

import com.archivos.shcarthrosalud.enums.EstadoHistoria;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "historia_clinica_antigua")
public class HistoriaClinicaAntigua {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historia_clinica_antigua")
    private Long idHistoriaClinicaAntigua;

    @Column(name = "dni",length = 50)
    private String dni;


    @Column(name = "nombre_completo",length = 255)
    private String nombreCompleto;

    @Column(name = "codigo_historia_antigua",length = 255)
    private  String codigoHistoriaAntigua;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_usuario", insertable = false, updatable = false)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private Usuario usuario;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado",length = 20)
    private EstadoHistoria estado = EstadoHistoria.DISPONIBLE;

    @Column(name = "solicitado_por",length = 50,nullable = true)
    private String solicitadoPor;


}
