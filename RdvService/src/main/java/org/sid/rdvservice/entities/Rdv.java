package org.sid.rdvservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.rdvservice.enums.RdvStatus;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;


import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rdv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private RdvStatus status;
    private Date rdvDate;
    private String Heure;
    // customer data
    private Long customerId;
    @Transient // dont save in the bd
    private Customer customer;

    // couturier data
    private Long couturierId;
    @Transient
    private Couturier couturier;

}
