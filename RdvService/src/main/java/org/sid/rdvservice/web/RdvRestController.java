package org.sid.rdvservice.web;


import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;
import org.sid.rdvservice.services.CouturierRestClient;
import org.sid.rdvservice.services.CustomerRestClient;
import org.sid.rdvservice.services.RdvService;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;


import java.util.Arrays;
import java.util.Date;
import java.util.List;
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

    @GetMapping("/RdvsByCouturier/{id}")
    public List<Rdv> getCouturierRdvs(@PathVariable String id){
        Long couturierId=this.couturierRestClient.getByIdkc(id).getId();
        return  rdvService.getCouturierCurrentRdv(new Date(),couturierId);
    }
    @GetMapping("/RdvsByCustomer/{id}")
    public List<Rdv> getCustomerRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        List<Rdv> lst= rdvService.getCustomerRdvs(code);
        rdvService.updateRdv(lst);
        return lst;
    }

    @GetMapping("/CurrentRdv/{id}")
    public List<Rdv> getCouturierCurrentRdv(@PathVariable Long id)  {
        return rdvService.getCouturierCurrentRdv(new Date(),id);
    }

    // save and update
    @PostMapping("/rdvs")
    public Rdv saveRdv(@RequestBody Rdv order){
        return rdvService.saveRdv(order);
    }
    @DeleteMapping("/rdvs/{id}")
    public void deleteRdv(@PathVariable Long id){
        rdvService.deleteRdv(id);
    }
    /*@PutMapping("/rdvs/{id}")
    public Rdv updateRdv(@PathVariable Long id, @RequestBody Rdv rdv){
        rdv.setId(id);
        System.out.println(rdv.toString());
        return rdvService.updateRdv(rdv);
    }*/
}
