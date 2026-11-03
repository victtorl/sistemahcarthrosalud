package com.archivos.shcarthrosalud.repository;

import com.archivos.shcarthrosalud.entity.PrestamoHistoria;
import com.archivos.shcarthrosalud.entity.PrestamoHistoriaAntigua;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrestamoHistoriaAntiguaRepository extends JpaRepository<PrestamoHistoriaAntigua, Long> {

    public Optional<PrestamoHistoriaAntigua> findFirstByHistoriaClinicaAntiguaIdHistoriaClinicaAntiguaAndFechaDevolucionIsNullOrderByFechaPrestamoDesc(Long idHistoria);

}
