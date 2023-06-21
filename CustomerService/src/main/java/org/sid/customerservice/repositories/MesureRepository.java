package org.sid.customerservice.repositories;

import org.sid.customerservice.entities.Mesure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface MesureRepository extends JpaRepository<Mesure,Long> {
}
