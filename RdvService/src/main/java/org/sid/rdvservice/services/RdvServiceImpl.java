package org.sid.rdvservice.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.exceptions.CouturierNotFoundException;
import org.sid.rdvservice.exceptions.CustomerNotFoundException;
import org.sid.rdvservice.exceptions.RdvNotFoundException;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;
import org.sid.rdvservice.repositories.RdvRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class RdvServiceImpl implements RdvService {
    RdvRepository rdvRepository;
    private CustomerRestClient customerRestClient;
    private CouturierRestClient couturierRestClient;
    @Override
    public Rdv saveRdv(Rdv rdv) {
        return rdvRepository.save(rdv);
    }

    @Override
    public Rdv getRdv(Long id) {
        Rdv rdv=rdvRepository.findById(id).orElse(null);
        if (rdv==null) throw new RdvNotFoundException("Rdv not Found");
        Customer customer=customerRestClient.customerById(rdv.getCustomerId());
        rdv.setCustomer(customer);
        Couturier couturier=couturierRestClient.couturierById(rdv.getCouturierId());
        rdv.setCouturier(couturier);
        return rdv;
    }

    @Override
    public Rdv updateRdv(Rdv rdv) {
        return rdvRepository.save(rdv);
    }

    @Override
    public void deleteRdv(Long id) {
        rdvRepository.deleteById(id);
    }

    @Override
    public List<Rdv> getRdvs() {
        List<Rdv> rdvs =rdvRepository.findAll();
        rdvs.forEach( rdv -> {
            Customer customer=customerRestClient.customerById(rdv.getCustomerId());
            Couturier couturier=couturierRestClient.couturierById(rdv.getCouturierId());
            rdv.setCustomer(customer);
            rdv.setCouturier(couturier);
        });
        //System.out.println(orders.toString());
        return rdvs ;
    }

    @Override
    public List<Rdv> getCustomerRdvs(Long customerId) {
        Customer customer=customerRestClient.customerById(customerId);
        if(customer==null) throw new CustomerNotFoundException("Customer Not Found");
        List<Rdv> rdvs=rdvRepository.findByCustomerId(customerId);
        rdvs.forEach( rdv -> {
            Couturier couturier=couturierRestClient.couturierById(rdv.getCouturierId());
            rdv.setCustomer(customer);
            rdv.setCouturier(couturier);
        });
        return rdvs;
    }

    @Override
    public List<Rdv> getCouturierRdvs(Long couturierId) {
        Couturier couturier=couturierRestClient.couturierById(couturierId);
        if(couturier==null) throw new CouturierNotFoundException("Couturier Not Found");
        List<Rdv> rdvs=rdvRepository.findByCouturierId(couturierId);
        rdvs.forEach( rdv -> {
            Customer customer=customerRestClient.customerById(rdv.getCustomerId());
            rdv.setCustomer(customer);
            rdv.setCouturier(couturier);
        });
        return rdvs;
    }
}
