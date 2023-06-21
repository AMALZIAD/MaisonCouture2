package org.sid.billingservice.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sid.billingservice.entities.Order;
import org.sid.billingservice.enums.OrderStatus;
import org.sid.billingservice.exceptions.CouturierNotFoundException;
import org.sid.billingservice.exceptions.CustomerNotFoundException;
import org.sid.billingservice.exceptions.OrderNotFoundException;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.sid.billingservice.repositories.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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


// CUSTOMERS ORDERS------------------------------------------------------------------
    // FINISHED CUTOMER ORDERS --------------------------------
    @Override
    public List<Order> getFinishedCustomerOrders(String idkc) {
        Customer customer=customerRestClient.findCustomerByIdkc(idkc);
        if(customer==null) throw new CustomerNotFoundException("Customer Not Found");
        List<OrderStatus> stat =new ArrayList<>();
        stat.add(OrderStatus.ANNULE);
        stat.add(OrderStatus.LIVRE);
        List<Order> orders=orderRepository.findByCustomerIdAndStatusIn(customer.getId(),stat);
        orders.forEach( order -> {
            Couturier couturier=couturierRestClient.couturierById(order.getCouturierId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        return orders;
    }
    // YET CUSTOMER ORDERS ---------------------------------------------------
    @Override
    public List<Order> getYetCustomerOrders(String idkc) {
        Customer customer=customerRestClient.findCustomerByIdkc(idkc);
        if(customer==null) throw new CustomerNotFoundException("Customer Not Found");
        List<OrderStatus> stat =new ArrayList<>();
        stat.add(OrderStatus.CREE);
        stat.add(OrderStatus.ENCOURS);
        stat.add(OrderStatus.VALIDE);
        stat.add(OrderStatus.TERMINE);
        List<Order> orders=orderRepository.findByCustomerIdAndStatusIn(customer.getId(),stat);
        orders.forEach( order -> {
            Couturier couturier=couturierRestClient.couturierById(order.getCouturierId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        return orders;
    }
    // finished orders
    //    List<Order> findByCouturierIdAndStatusGreaterThan(Long couturierId,Long stat);
    @Override
    public List<Order> getCouturierFinishedOrders(String idkc) {
        Couturier couturier=couturierRestClient.getByIdkc(idkc);
        if(couturier==null) throw new CouturierNotFoundException("Couturier Not Found");
        List<OrderStatus> stat =new ArrayList<>();
        stat.add(OrderStatus.ANNULE);
        stat.add(OrderStatus.LIVRE);
        List<Order> orders=orderRepository.findByCouturierIdAndStatusIn(couturier.getId(),stat);
        orders.forEach( order -> {
            Customer customer=customerRestClient.customerById(order.getCustomerId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        return orders;
    }
    // not finished yet  orders
    @Override
    public List<Order> getCouturierYetOrders(String idkc) {
        Couturier couturier=couturierRestClient.getByIdkc(idkc);
        if(couturier==null) throw new CouturierNotFoundException("Couturier Not Found");
        List<OrderStatus> stat =new ArrayList<>();
        stat.add(OrderStatus.CREE);
        stat.add(OrderStatus.ENCOURS);
        stat.add(OrderStatus.VALIDE);
        stat.add(OrderStatus.TERMINE);
        List<Order> orders=orderRepository.findByCouturierIdAndStatusIn(couturier.getId(),stat);
        orders.forEach( order -> {
            Customer customer=customerRestClient.customerById(order.getCustomerId());
            order.setCustomer(customer);
            order.setCouturier(couturier);
        });
        return orders;
    }
    @Override
    public List<Customer> getCustomersByCouturier(Long couturierId) {
        List<Order> orders=orderRepository.findByCouturierId(couturierId);
        List<Customer> customers = new ArrayList<>();
        orders.forEach( order -> {
            customers.add(customerRestClient.customerById(order.getCustomerId()));
        });
        return customers;
    }
    @Override
    public List<Couturier> getCouturiesByCustomer(Long customerId) {
        List<Order> orders=orderRepository.findByCustomerId(customerId);
        List<Couturier> couturiers = new ArrayList<>();
        orders.forEach( order -> {
            couturiers.add(couturierRestClient.couturierById(order.getCustomerId()));
        });
        return couturiers;
    }
}

