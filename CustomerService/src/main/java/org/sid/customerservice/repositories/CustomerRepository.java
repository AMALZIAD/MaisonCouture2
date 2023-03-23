package org.sid.customerservice.repositories;

import org.sid.customerservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RepositoryRestResource
public interface CustomerRepository extends JpaRepository  <Customer,Long> {
    @GetMapping("findByIdkc/{idkc}")
     Customer findByIdkc(@PathVariable String idkc);
}
