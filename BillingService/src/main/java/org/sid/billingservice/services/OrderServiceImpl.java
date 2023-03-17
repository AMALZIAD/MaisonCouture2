package org.sid.billingservice.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.billingservice.entities.Order;
import org.sid.billingservice.exceptions.CouturierNotFoundException;
import org.sid.billingservice.exceptions.CustomerNotFoundException;
import org.sid.billingservice.exceptions.OrderNotFoundException;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.sid.billingservice.repositories.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private CustomerRestClient customerRestClient;
    private CouturierRestClient couturierRestClient;

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order getOrder(Long id) {
        Order order=orderRepository.findById(id).orElse(null);
        if (order==null) throw new OrderNotFoundException("Order not Found");
        Customer customer=customerRestClient.customerById(order.getCustomerId());
        order.setCustomer(customer);
        Couturier couturier=couturierRestClient.couturierById(order.getCouturierId());
        order.setCouturier(couturier);
        return order;
    }

    @Override
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
         orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getOrders() {
        List<Order> orders =orderRepository.findAll();
        orders.forEach( order -> {
            Customer customer=customerRestClient.customerById(order.getCustomerId());
            Couturier couturier=couturierRestClient.couturierById(order.getCouturierId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        //System.out.println(orders.toString());
        return orders ;
    }

    @Override
    public List<Order> getCustomerOrders(Long customerId) {
        Customer customer=customerRestClient.customerById(customerId);
        if(customer==null) throw new CustomerNotFoundException("Customer Not Found");
        List<Order> orders=orderRepository.findByCustomerId(customerId);
        orders.forEach( order -> {
            Couturier couturier=couturierRestClient.couturierById(order.getCouturierId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        return orders;
    }
    @Override
    public List<Order> getCouturierOrders(Long couturierId) {
        Couturier couturier=couturierRestClient.couturierById(couturierId);
        if(couturier==null) throw new CouturierNotFoundException("Couturier Not Found");
        List<Order> orders=orderRepository.findByCouturierId(couturierId);
        orders.forEach( order -> {
            Customer customer=customerRestClient.customerById(order.getCustomerId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        return orders;
    }
}

