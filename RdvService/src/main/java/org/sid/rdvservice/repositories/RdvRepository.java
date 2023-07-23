package org.sid.rdvservice.repositories;

import org.sid.rdvservice.entities.Rdv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface RdvRepository extends JpaRepository<Rdv,Long> {
    List<Rdv> findByCustomerId(Long customerId);
    List<Rdv> findByCouturierId(Long couturierId);
    List<Rdv> findRdvsByRdvDateEquals(String date);

    List<Rdv> findRdvsByRdvDateLessThanAndCouturierId(Date rdvDate, Long id);
    List<Rdv> findRdvsByRdvDateGreaterThanAndCouturierId(Date rdvDate, Long id);
    List<Rdv> findRdvsByRdvDateGreaterThanAndCustomerId(Date rdvDate, Long id);
    List<Rdv> findRdvsByRdvDateLessThanAndCustomerId(Date rdvDate, Long id);


    // pagination COUTURIER
    Page<Rdv> findRdvsByRdvDateLessThanAndCouturierId(Date rdvDate, Long id, Pageable pageable);
    Page<Rdv> findRdvsByRdvDateGreaterThanAndCouturierId(Date rdvDate, Long id, Pageable pageable);
    // pagination CUSTOMER
    Page<Rdv> findRdvsByRdvDateGreaterThanAndCustomerId(Date rdvDate, Long id, Pageable pageable);
    Page<Rdv> findRdvsByRdvDateLessThanAndCustomerId(Date rdvDate, Long id, Pageable pageable);
}
