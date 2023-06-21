package org.sid.rdvservice.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.enums.RdvStatus;
import org.sid.rdvservice.exceptions.CouturierNotFoundException;
import org.sid.rdvservice.exceptions.CustomerNotFoundException;
import org.sid.rdvservice.exceptions.RdvNotFoundException;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;
import org.sid.rdvservice.repositories.RdvRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
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
    public void updateRdv(List<Rdv> lst) {
        Date mtn=new Date();
        mtn.setHours(0);
        mtn.setMinutes(0);
        mtn.setSeconds(0);
        lst.forEach(rdv -> {
            if(rdv.getRdvDate().compareTo(mtn)<=0){
                System.out.println("Date "+rdv.getRdvDate().toString()+" occurs before Date "+mtn.toString());
                   if(rdv.getStatus()==RdvStatus.PRIS) {
                       rdv.setStatus(RdvStatus.DEPASSE);
                       rdvRepository.save(rdv);
                   }
            }
        });
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

    // old customer rdvs
    @Override
    public List<Rdv> getCustomerOldRdvs(Long customerId) {
        Customer customer=customerRestClient.customerById(customerId);
        if(customer==null) throw new CustomerNotFoundException("Customer Not Found");
        Date dt = new Date();
        Date hier = new Date(dt.getTime() - (1000 * 60 * 60 * 24));
        List<Rdv> rdvs=rdvRepository.findRdvsByRdvDateLessThanAndCustomerId(hier,customerId);
        rdvs.forEach( rdv -> {
            Couturier couturier=couturierRestClient.couturierById(rdv.getCouturierId());
            rdv.setCouturier(couturier);
            if(rdv.getStatus()==RdvStatus.PRIS){
                rdv.setStatus(RdvStatus.DEPASSE);
                rdvRepository.save(rdv);
            }
        });
        return rdvs;
    }
    // new customer rdvs
    @Override
    public List<Rdv> getCustomerNewRdvs(Long customerId) {
        Customer customer=customerRestClient.customerById(customerId);
        if(customer==null) throw new CustomerNotFoundException("Customer Not Found");
        Date dt = new Date();
        Date hier = new Date(dt.getTime() - (1000 * 60 * 60 * 24));
        List<Rdv> rdvs=rdvRepository.findRdvsByRdvDateGreaterThanAndCustomerId(hier,customerId);
        rdvs.forEach( rdv -> {
            Couturier couturier=couturierRestClient.couturierById(rdv.getCouturierId());
            rdv.setCouturier(couturier);
        });
        return rdvs;
    }

    // get couturier old rdvs
    @Override
    public List<Rdv> getCouturierRdvs(Long couturierId) {
        Couturier couturier=couturierRestClient.couturierById(couturierId);
        if(couturier==null) throw new CouturierNotFoundException("Couturier Not Found");
        Date dt = new Date();
        Date hier = new Date(dt.getTime() - (1000 * 60 * 60 * 24));
        List<Rdv> rdvs=rdvRepository.findRdvsByRdvDateLessThanAndCouturierId(hier,couturierId);
        rdvs.forEach( rdv -> {
            if(rdv.getCustomerId()!=0){
                Customer customer=customerRestClient.customerById(rdv.getCustomerId());
                rdv.setCustomer(customer);
            }
            if(rdv.getStatus()==RdvStatus.PRIS){
                rdv.setStatus(RdvStatus.DEPASSE);
                rdvRepository.save(rdv);
            }
        });
        return rdvs;
    }
    // recuperer la liste des rdv encours pour la prise des rdvs from tomoroow
    @Override
    public List<Rdv> getCouturierCurrentRdv(Date rdvDate, Long id) {
        List<Rdv> rdvs=rdvRepository.findRdvsByRdvDateGreaterThanAndCouturierId(rdvDate,id);
        return rdvs;
    }
}
