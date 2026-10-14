package com.archivos.shcarthrosalud.entity;

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
    private Long idHistoriaAntigua;

    @Column(name = "dni",length = 30)
    private String dni;

    @Column(name = "nombre_completo",length = 100)
    private String nombreCompleto;

    @Column(name = "codigo_historia_antigua")
    private  String codigoHistoriaAntigua;


}
