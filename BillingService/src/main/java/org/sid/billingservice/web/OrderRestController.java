package org.sid.billingservice.web;

import org.sid.billingservice.entities.Details;
import org.sid.billingservice.entities.Order;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.sid.billingservice.services.CouturierRestClient;
import org.sid.billingservice.services.CustomerRestClient;
import org.sid.billingservice.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OrderRestController {
    OrderService orderService;
    CustomerRestClient customerRestClient;
    CouturierRestClient couturierRestClient;

    public OrderRestController(OrderService orderService, CustomerRestClient customerRestClient, CouturierRestClient couturierRestClient) {
        this.orderService = orderService;
        this.customerRestClient = customerRestClient;
        this.couturierRestClient = couturierRestClient;
    }

    // get one and many
    @GetMapping("/orders/{id}")
    public Order getOrder(@PathVariable Long id){
       return orderService.getOrder(id);
    }
    @GetMapping("/orders")
    public List<Order> getOrders(){
        return orderService.getOrders();
    }
    @GetMapping("/FinishedOrderByCustomer/{id}")
    public List<Order> getFinishedCustomerOrders(@PathVariable String id){
        return orderService.getFinishedCustomerOrders(id);
    }
    @GetMapping("/YetOrderByCustomer/{id}")
    public List<Order> getYetCustomerOrders(@PathVariable String id){
        return orderService.getYetCustomerOrders(id);
    }
    @GetMapping("/FinishedOrderByCouturier/{id}")
    public List<Order> getFinishedOrderByCouturier(@PathVariable String id){
        // get id from couturier RestClient
        return orderService.getCouturierFinishedOrders(id);
    }
    @GetMapping("/YetOrderByCouturier/{id}")
    public List<Order> getYetOrderByCouturier(@PathVariable String id){
        // get id from couturier RestClient
        return orderService.getCouturierYetOrders(id);
    }
    //getCustomersByCouturier
    @GetMapping("/CustomersByCouturier/{id}")
    public List<Customer> getCustomersByCouturier(@PathVariable Long id){
        return orderService.getCustomersByCouturier(id);
    }
    @GetMapping("/CouturiersByCustomer/{id}")
    public List<Couturier> getCouturiesByCustomer(@PathVariable Long id){
        return orderService.getCouturiesByCustomer(id);
    }
    // save and update
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody Order order){
        return orderService.saveOrder(order);
    }
    @DeleteMapping("/orders/{id}")
    public void deleteCustomer(@PathVariable Long id){
        orderService.deleteOrder(id);
    }
    @PutMapping("/orders/{id}")
    public Order updateCustomer(@PathVariable Long id, @RequestBody Order order){
        order.setId(id);
        System.out.println(order.toString());
        return orderService.updateOrder(order);
    }

    // SEND EMAIL OPTION
    @Autowired
    private JavaMailSender sender;
    @Autowired
    SpringTemplateEngine templateEngine;
    @RequestMapping("/mailCmd")
    public @ResponseBody
    Details sendMail(@RequestBody Details details) throws Exception {

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("numero",details.getNumCmd());
        model.put("etat",details.getEtat());
        model.put("prix",details.getPrix());
        model.put("tenue",details.getTenue());
        model.put("name",details.getName());
        model.put("date",details.getDatecmd());
        model.put("contact",details.getContact());

        Context context = new Context();
        context.setVariables(model);
        String html = templateEngine.process("email-cmd", context);

        try {
            helper.setTo(details.getEmail());
            helper.setText(html,true);
            helper.setSubject("Suivi de Commande N°"+details.getNumCmd());
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
        sender.send(message);

        return details;

    }
}
