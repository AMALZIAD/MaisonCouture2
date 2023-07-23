package org.sid.rdvservice.web;


import org.sid.rdvservice.entities.Details;
import org.sid.rdvservice.entities.RdcClient;
import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;
import org.sid.rdvservice.services.CouturierRestClient;
import org.sid.rdvservice.services.CustomerRestClient;
import org.sid.rdvservice.services.RdvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.PagedModel;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;


import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;

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
    public Rdv getRdv(@PathVariable Long id){
        return rdvService.getRdv(id);
    }
    @GetMapping("/rdvs")
    public List<Rdv> getRdvs(){
        return rdvService.getRdvs();
    }

    // --------------------------------COUTURIER-------------------------------------
    // new rdv encours couturioer from today !!! ( mesrdvs)
   /* @GetMapping("/NewRdvCouturier/{id}")
    public List<Rdv> getNewRdvCouturier(@PathVariable String id){
        System.out.println("id kc rdv "+id);
        Long couturierId=this.couturierRestClient.getByIdkc(id).getId();
        Date dt = new Date();
        Date hier = new Date(dt.getTime() - (1000 * 60 * 60 * 24));
        System.out.println(hier.toString());
        return  rdvService.getCouturierCurrentRdv(hier,couturierId);
    }*/
    @GetMapping("/NewRdvCouturier/{id}")
    public Page<Rdv> getNewRdvCouturier(@PathVariable String id,
          @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        System.out.println("id kc rdv "+id);
        Long couturierId=this.couturierRestClient.getByIdkc(id).getId();
        Pageable paging = PageRequest.of(page, size);
        return  rdvService.getNewCouturierRdvs(couturierId,paging);
    }

    // rdv old couturioer from yesterday!!! (mesrdvs)
   /* @GetMapping("/RdvsByCouturier/{id}")
    public List<Rdv> getCouturierRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby couturier");
        Long code =this.couturierRestClient.getByIdkc(id).getId();
        System.out.println(code);
        return rdvService.getCouturierRdvs(code);
    }*/
    // pagination-------------------------------
    @GetMapping("/OldRdvCouturier/{id}")
    public Page<Rdv> getOldRdvCouturier(@PathVariable String id,
                                      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        System.out.println("im inside rdv rest --- rdvby couturier");
        Long code =this.couturierRestClient.getByIdkc(id).getId();
        System.out.println(code);
        Pageable paging = PageRequest.of(page, size);
        return rdvService.getOldCouturierRdvs(code,paging);
    }

    //------------------------- SCHEDULE -------------------------------
    @GetMapping("/CurrentRdv/{id}")
    public List<Rdv> getCouturierCurrentRdv(@PathVariable Long id)  {
        return rdvService.getCouturierCurrentRdv(new Date(),id);
    }

    ////////////////////////////////////CUSTOMER///////////////////////////////////////
   /* @GetMapping("/NewRdvsByCustomer/{id}")
    public List<Rdv> getCustomerNewRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        List<Rdv> lst= rdvService.getCustomerNewRdvs(code);
        return lst;
    }*/
    @GetMapping("/NewRdvsByCustomer/{id}")
    public Page<Rdv> getCustomerNewRdvs(@PathVariable String id
            ,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        Pageable paging = PageRequest.of(page, size);
        return rdvService.getCustomerNewRdvs(code,paging);
    }
    /*@GetMapping("/OldRdvsByCustomer/{id}")
    public List<Rdv> getCustomerOldRdvs(@PathVariable String id){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        List<Rdv> lst= rdvService.getCustomerOldRdvs(code);
       // rdvService.updateRdv(lst);
        return lst;
    }*/
    @GetMapping("/OldRdvsByCustomer/{id}")
    public Page<Rdv> getCustomerOldRdvs(@PathVariable String id
            ,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size){
        System.out.println("im inside rdv rest --- rdvby customer");
        Long code =this.customerRestClient.getByIdkc(id).getId();
        System.out.println(code);
        Pageable paging = PageRequest.of(page, size);
        return rdvService.getCustomerOldRdvs(code,paging);
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

    // SEND EMAIL OPTION
    @Autowired
    private JavaMailSender sender;
    @Autowired
    SpringTemplateEngine templateEngine;
    @RequestMapping("/mailCouturier")
    public @ResponseBody
    RdcClient sendMailCout(@RequestBody RdcClient client) throws Exception {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("date",client.getDaterdv());
        model.put("client",client.getClient());
        model.put("heure",client.getHeure());
        model.put("name",client.getName());


        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("email-rdv-couturier", context);

        try {
            helper.setTo(client.getEmail());
            helper.setText(html,true);
            helper.setSubject(" Prise de rendez-vous confirmée");
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
        sender.send(message);

        return client;

    }

    @RequestMapping("/mailCustomer")
    public @ResponseBody
    RdcClient sendMailCust(@RequestBody RdcClient client) throws Exception {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("date",client.getDaterdv());
        model.put("client",client.getClient());
        model.put("heure",client.getHeure());
        model.put("name",client.getName());

            System.out.println("client :"+client.getClient());
        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("email-rdv-customer", context);

        try {
            helper.setTo(client.getEmail());
            helper.setText(html,true);
            helper.setSubject(" Prise de rendez-vous confirmée");
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
        sender.send(message);
        return client;

    }
    @RequestMapping("/mailContact")
    public @ResponseBody
    RdcClient sendMailContact(@RequestBody RdcClient client) throws Exception {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name",client.getName());
        model.put("email",client.getEmail());
        model.put("date",client.getDaterdv());
        model.put("client",client.getClient());

        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("email-contact", context);

        try {
            helper.setTo("amal.amal.ziad@gmail.com");
            helper.setText(html,true);
            helper.setSubject(client.getDaterdv());
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
        sender.send(message);

        return client;

    }



}
