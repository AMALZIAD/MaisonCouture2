package org.sid.billingservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.billingservice.enums.Categorie;
import org.sid.billingservice.enums.OrderStatus;
import org.sid.billingservice.enums.Tenue;
import org.sid.billingservice.enums.TypeCouture;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;

import javax.persistence.*;
import java.util.Date;

@Entity (name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    // Order data
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private TypeCouture typecouture;
    private Categorie categorie;
    private Tenue tenue;
    private Date orderdate;
    private OrderStatus status;
    private double amount ;

    // customer data
    private Long customerId;
    @Transient
    private Customer customer;

    // couturier data
    private Long couturierId;
    @Transient
    private Couturier couturier;

}
