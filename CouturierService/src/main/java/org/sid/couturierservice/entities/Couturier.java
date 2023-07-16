package org.sid.couturierservice.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor@AllArgsConstructor @ToString
public class Couturier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idkc;
    private String name;
    private String email;
    private String adresse;
    private String homePhone;
    private String profile;
    private double rate;
    private String photo;
    @ElementCollection
    private List<String> gallery ;
    @OneToMany(mappedBy ="couturier" )
    public List <Review> reviews = new ArrayList<>();

    public double getRate() {
        rate=0;
        for ( int i =0;i<reviews.size();i++){
            rate+=reviews.get(i).getRate();
        }
        if(rate!=0){
            rate=rate/reviews.size();
        }
        return rate;
    }
}
