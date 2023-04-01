package org.sid.couturierservice.repositories;

import org.sid.couturierservice.entities.Couturier;
import org.sid.couturierservice.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource
public interface ReviewRepository extends JpaRepository<Review,Long> {
}
