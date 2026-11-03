package com.archivos.shcarthrosalud.repository;

import com.archivos.shcarthrosalud.entity.HistoriaClinica;
import com.archivos.shcarthrosalud.entity.HistoriaClinicaAntigua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//JpaRepository<HistoriaClinica,Long>
public interface HistoriaClinicaAntiguaRepository extends JpaRepository<HistoriaClinicaAntigua,Long>{

    @Query("SELECT ha FROM HistoriaClinicaAntigua ha " +
    "WHERE ha.nombreCompleto LIKE CONCAT('%',:coincidencia_nombre,'%')")
    List<HistoriaClinicaAntigua> buscarPorCoincidenciaNombre(
        @Param("coincidencia_nombre") String coincidenciaNombre
    );


    @Query("SELECT ha FROM HistoriaClinicaAntigua ha " +
            "WHERE ha.nombreCompleto LIKE CONCAT(:coincidencia_nombre,'%')")
    List<HistoriaClinicaAntigua> buscarPorPrimerasLetras(
            @Param("coincidencia_nombre") String coincidenciaNombre
    );



}