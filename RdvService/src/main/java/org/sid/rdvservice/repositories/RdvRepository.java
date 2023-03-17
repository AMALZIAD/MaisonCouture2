package org.sid.rdvservice.repositories;

import org.sid.rdvservice.entities.Rdv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RdvRepository extends JpaRepository<Rdv,Long> {
}
