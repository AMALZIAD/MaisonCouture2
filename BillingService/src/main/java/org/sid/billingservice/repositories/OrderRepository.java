package org.sid.billingservice.repositories;

import org.sid.billingservice.entities.Order;
import org.sid.billingservice.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByCouturierId(Long couturierId);
    //  finished orders
    //List<Order> findByCouturierIdAndStatusGreaterThan(Long couturierId,Long stat);
    // not yet finished  orders
    //List<Order> findByCouturierIdAndStatusLessThan(Long couturierId,Long stat);

    //  COUTURIER ORDERS
    List<Order> findByCouturierIdAndStatusIn(Long couturierId,List<OrderStatus> stat);
    //  CUTOMER ORDERS
    List<Order> findByCustomerIdAndStatusIn(Long couturierId,List<OrderStatus> stat);

    //  COUTURIER ORDERS PAGINATION
    Page<Order> findByCouturierIdAndStatusIn(Long couturierId,List<OrderStatus> stat,Pageable pageable);
    //  CUTOMER ORDERS PAGINATION
    Page<Order> findByCustomerIdAndStatusIn(Long couturierId, List<OrderStatus> stat, Pageable pageable);
}
