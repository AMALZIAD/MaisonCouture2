package org.sid.rdvservice.web;

import lombok.AllArgsConstructor;
import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.services.CouturierRestClient;
import org.sid.rdvservice.services.CustomerRestClient;
import org.sid.rdvservice.services.RdvService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

    /*@GetMapping("/fullorder/{id}")
    public Order order(@PathVariable Long id){
        Order order=orderRepository.findById(id).get();
        Customer customer=customerRestClient.customerById(order.getCustomerId());
        Couturier couturier=couturierRestClient.couturierById(order.getCouturierId());
        System.out.println(customer);
        System.out.println(customer);
        order.setCustomer(customer);
        order.setCouturier(couturier);
        return order;
    }*/

    // get one and many
    @GetMapping("/rdvs/{id}")
    public Rdv getOrder(@PathVariable Long id){
        return rdvService.getRdv(id);
    }
    @GetMapping("/rdvs")
    public List<Rdv> getRdvs(){
        return rdvService.getRdvs();
    }

    @GetMapping("/RdvsByCustomer/{id}")
    public List<Rdv> getCouturierRdvs(@PathVariable Long id){
        return rdvService.getCustomerRdvs(id);
    }
    @GetMapping("/RdvsByCouturier/{id}")
    public List<Rdv> getCustomerRdvs(@PathVariable Long id){
        return rdvService.getCouturierRdvs(id);
    }
    @GetMapping("/CurrentRdv/{rdvDate}/{id}")
    public List<Rdv> getCouturierCurrentRdv(@PathVariable String rdvDate,@PathVariable Long id) throws ParseException {

        Date date=new SimpleDateFormat("dd-MM-yyyy").parse(rdvDate);
        System.out.println(date.toString());
        return rdvService.getCouturierCurrentRdv(date,id);
    }

    // save and update
    @PostMapping("/rdvs")
    public Rdv saveOrder(@RequestBody Rdv order){
        return rdvService.saveRdv(order);
    }
    @DeleteMapping("/rdvs/{id}")
    public void deleteCustomer(@PathVariable Long id){
        rdvService.deleteRdv(id);
    }
    @PutMapping("/rdvs/{id}")
    public Rdv updateCustomer(@PathVariable Long id, @RequestBody Rdv rdv){
        rdv.setId(id);
        System.out.println(rdv.toString());
        return rdvService.updateRdv(rdv);
    }
}
