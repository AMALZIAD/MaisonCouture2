package org.sid.customerservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor@ToString
public class Mesure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double tourEpaule;
    private double tourTaille;
    private double hauteur;
    @OneToOne(mappedBy = "mesure",fetch = FetchType.LAZY)
    private Customer customer;
}
