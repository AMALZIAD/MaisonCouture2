package org.sid.rdvservice.services;

import org.sid.rdvservice.entities.Rdv;

import java.util.Date;
import java.util.List;

public interface RdvService {
    Rdv saveRdv(Rdv rdv);
    Rdv getRdv(Long id);
    void updateRdv(List<Rdv> lst);
    void deleteRdv(Long id);
    List<Rdv> getRdvs();
    List<Rdv> getCustomerRdvs(Long customerId);
    List<Rdv> getCouturierRdvs(Long couturierId);
    List<Rdv> getCouturierCurrentRdv(Date rdvDate, Long id);
}
