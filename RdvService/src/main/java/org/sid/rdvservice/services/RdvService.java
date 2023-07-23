package org.sid.rdvservice.services;

import org.sid.rdvservice.entities.Rdv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface RdvService {
    Rdv saveRdv(Rdv rdv);
    Rdv getRdv(Long id);
    void updateRdv(List<Rdv> lst);
    void deleteRdv(Long id);
    List<Rdv> getRdvs();

   /* List<Rdv> getCustomerOldRdvs(Long customerId);
    List<Rdv> getCustomerNewRdvs(Long customerId);
    List<Rdv> getCouturierRdvs(Long couturierId);*/
    //schedule---------------------------------------------------
    List<Rdv> getCouturierCurrentRdv(Date rdvDate, Long id);

    //pagination couturier
    Page<Rdv> getOldCouturierRdvs(Long couturierId,Pageable pageable);
    Page<Rdv> getNewCouturierRdvs( Long id,Pageable pageable);

    //pagination customer
    Page<Rdv> getCustomerOldRdvs(Long customerId,Pageable pageable);
    Page<Rdv> getCustomerNewRdvs(Long customerId,Pageable pageable);
}
