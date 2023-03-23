package org.sid.customerservice.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor@AllArgsConstructor@ToString
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String adresse;
    private String photo;
    private String idkc;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesure_id")
    private Mesure mesure;
    }

