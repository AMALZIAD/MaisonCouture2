package org.sid.billingservice.web;

import org.sid.billingservice.entities.Order;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.sid.billingservice.services.CouturierRestClient;
import org.sid.billingservice.services.CustomerRestClient;
import org.sid.billingservice.services.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/orders/{id}")
    public Order getOrder(@PathVariable Long id){
       return orderService.getOrder(id);
    }
    @GetMapping("/orders")
    public List<Order> getOrders(){
        return orderService.getOrders();
    }
    @GetMapping("/OrderByCustomer/{id}")
    public List<Order> getCustomerOrders(@PathVariable Long id){
        return orderService.getCustomerOrders(id);
    }
    @GetMapping("/OrderByCouturier/{id}")
    public List<Order> getCouturierOrders(@PathVariable Long id){
        return orderService.getCouturierOrders(id);
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

}
