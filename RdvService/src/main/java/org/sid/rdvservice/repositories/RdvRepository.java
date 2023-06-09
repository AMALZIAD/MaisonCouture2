package org.sid.rdvservice.repositories;

import org.sid.rdvservice.entities.Rdv;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RdvRepository extends JpaRepository<Rdv,Long> {
    List<Rdv> findByCustomerId(Long customerId);
    List<Rdv> findByCouturierId(Long couturierId);

}
