package org.sid.rdvservice.web;


import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;
import org.sid.rdvservice.services.CouturierRestClient;
import org.sid.rdvservice.services.CustomerRestClient;
import org.sid.rdvservice.services.RdvService;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

@RestController
public class RdvRestController {
    RdvService rdvService;
    CustomerRestClient customerRestClient;
    CouturierRestClient couturierRestClient;

    public RdvRestController(RdvService rdvService, CustomerRestClient customerRestClient, CouturierRestClient couturierRestClient) {
        this.rdvService = rdvService;
        this.customerRestClient = customerRestClient;
        this.couturierRestClient = couturierRestClient;
    }

    // get one and many
    @GetMapping("/rdvs/{id}")
    public Rdv getOrder(@PathVariable Long id){
        return rdvService.getRdv(id);
    }
    @GetMapping("/rdvs")
    public List<Rdv> getRdvs(){
        return rdvService.getRdvs();
    }

    // rdv encours couturioer from today !!! ( mesrdvs)
    @GetMapping("/TodayRdv/{id}")
    public List<Rdv> getTodayRdvs(@PathVariable String id){
        Long couturierId=this.couturierRestClient.getByIdkc(id).getId();
        Date dt = new Date();
        Date hier = new Date(dt.getTime() - (1000 * 60 * 60 * 24));
        System.out.println(hier.toString());
        return  rdvService.getCouturierCurrentRdv(hier,couturierId);
    }
    // rdv old couturioer from yesterday!!! (mesrdvs)
    @GetMapping("/RdvsByCouturier/{id}")
    public List<Rdv> getCouturierRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby couturier");
        Long code =this.couturierRestClient.getByIdkc(id).getId();
        System.out.println(code);
        return rdvService.getCouturierRdvs(code);
    }
    // rdv encours couturioer from tomorow !!! (schedule)
    @GetMapping("/CurrentRdv/{id}")
    public List<Rdv> getCouturierCurrentRdv(@PathVariable Long id)  {
        return rdvService.getCouturierCurrentRdv(new Date(),id);
    }

    ////////////////////////////////////CUSTOMER///////////////////////////////////////
    @GetMapping("/NewRdvsByCustomer/{id}")
    public List<Rdv> getCustomerNewRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        List<Rdv> lst= rdvService.getCustomerNewRdvs(code);
        //rdvService.updateRdv(lst);
        return lst;
    }
    @GetMapping("/OldRdvsByCustomer/{id}")
    public List<Rdv> getCustomerOldRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        List<Rdv> lst= rdvService.getCustomerOldRdvs(code);
       // rdvService.updateRdv(lst);
        return lst;
    }

    // save and update rdv
    @PostMapping("/rdvs")
    public Rdv saveRdv(@RequestBody Rdv rdv){
        return rdvService.saveRdv(rdv);
    }
    @DeleteMapping("/rdvs/{id}")
    public void deleteConge(@PathVariable Long id){
        System.out.println("im inside server DELETE ");
        rdvService.deleteRdv(id);
        System.out.println("rdv deleted ");
    }

    /*@PutMapping("/rdvs/{id}")
    public Rdv updateRdv(@PathVariable Long id, @RequestBody Rdv rdv){
        rdv.setId(id);
        System.out.println(rdv.toString());
        return rdvService.updateRdv(rdv);
    }*/
}
