package org.sid.billingservice.services;

import org.sid.billingservice.entities.Order;

import java.util.List;

public interface OrderService {
    Order saveOrder(Order order);
    Order getOrder(Long id);
    Order updateOrder(Order order);
     void deleteOrder(Long id);
    List<Order> getOrders();
    List<Order> getCustomerOrders(Long customerId);
    List<Order> getCouturierOrders(Long couturierId);
}
