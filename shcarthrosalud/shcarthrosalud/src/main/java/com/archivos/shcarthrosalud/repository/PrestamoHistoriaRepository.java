package com.archivos.shcarthrosalud.repository;

import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PrestamoHistoriaRepository extends JpaRepository<PrestamoHistoria, Long> {

     //listar el historial de una historia
     public List<PrestamoHistoria> findByHistoriaClinicaIdHistoriaOrderByFechaPrestamoDesc(Long idHistoria);

     public Optional<PrestamoHistoria> findFirstByHistoriaClinicaIdHistoriaAndFechaDevolucionIsNullOrderByFechaPrestamoDesc(Long idHistoria);
}
