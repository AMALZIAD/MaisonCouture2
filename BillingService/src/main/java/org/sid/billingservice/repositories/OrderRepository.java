package org.sid.billingservice.repositories;

import org.sid.billingservice.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByCouturierId(Long couturierId);
}
