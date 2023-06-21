package org.sid.couturierservice.repositories;

import org.sid.couturierservice.entities.Couturier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface CouturierRepository extends JpaRepository  <Couturier,Long> {
    public Couturier findCouturierByIdkc(String id);
}
