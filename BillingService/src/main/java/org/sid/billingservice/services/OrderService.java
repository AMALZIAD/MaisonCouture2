package org.sid.billingservice.services;

import org.sid.billingservice.entities.Order;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Order saveOrder(Order order);
    Order getOrder(Long id);
    Order updateOrder(Order order);
     void deleteOrder(Long id);
    List<Order> getOrders();
    //List<Order> getCustomerOrders(Long customerId);
    //List<Order> getCustomerOrders(String idkc);
   // List<Order> getCouturierOrders(String idkc);

    // CUSTOMERS ORDERS------------------------------------------------------------------
       /* // FINISHED CUTOMER ORDERS
         List<Order> getFinishedCustomerOrders(String idkc);
        // YET CUSTOMER ORDERS
        List<Order> getYetCustomerOrders(String idkc);*/

    //pagination----------------------------------------
         Page<Order> getFinishedCustomerOrders(String idkc, Pageable pageable);
         Page<Order> getYetCustomerOrders(String idkc, Pageable pageable);

    // COUTURIER
    //    List<Order> findByCouturierIdAndStatusGreaterThan(Long couturierId,Long stat);
    /*List<Order> getCouturierFinishedOrders(String idkc);
    List<Order> getCouturierYetOrders(String idkc);*/
    //PAGINATION
        Page<Order> getCouturierFinishedOrders(String idkc,Pageable pageable);
        Page<Order> getCouturierYetOrders(String idkc,Pageable pageable);
    //---------------------------------------------------------------------
    List<Customer> getCustomersByCouturier(Long couturierId);
    List<Couturier> getCouturiesByCustomer(Long customerId);
}
