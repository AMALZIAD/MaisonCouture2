package org.sid.couturierservice.web;

import lombok.AllArgsConstructor;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.sid.couturierservice.entities.Couturier;
import org.sid.couturierservice.entities.Review;
import org.sid.couturierservice.repositories.CouturierRepository;
import org.sid.couturierservice.repositories.ReviewRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@AllArgsConstructor
public class CouturierRestController {

    CouturierRepository couturierRepository;
    ReviewRepository reviewRepository;


    // get all customers
    @GetMapping("/couturiers")
    public List<Couturier> getAll(){
        return couturierRepository.findAll();
    }
    @PostMapping("/reviews")
    public Review saveReview(@RequestBody Review review){
        System.out.println("hello from controller "+review.toString());
        return reviewRepository.save(review);
    }
    // save couturier
    @PostMapping("/couturiers")
    public Couturier saveCouturier(@RequestBody Couturier couturier){
        System.out.println(couturier);
        //asign role in keycloak and clear kcrole
       assignRole(couturier.getIdkc());
        return  couturierRepository.save(couturier);
    }
    @PostMapping("/editCouturier")
    public Couturier editCustomer(@RequestBody Couturier couturier){
        System.out.println(couturier);
        return  couturierRepository.save(couturier);
    }
    // get Couturier byIdkc !!!!
    @GetMapping("/CouturierByIdkc/{id}")
    public Couturier findCustomerByIdkc(@PathVariable String id){
        return couturierRepository.findCouturierByIdkc(id);
    }


    // assign role couturier to connected user
    public void assignRole( String id){
        // get acces to keycloak admin interface
        Keycloak kc = KeycloakBuilder.builder() //
                .serverUrl("http://localhost:8080/") //
                .realm("master")//
                .username("admin") //
                .password("1234") //
                .clientId("admin-cli") //
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build()) //
                .build();
        System.out.println("realm connected");
        // get the role
        RoleRepresentation savedRoleRepresentation =
                kc.realm("couture-realm").roles().get("COUTURIER").toRepresentation();
        System.out.println("role detected");

        // asign role
        System.out.println("sub!  "+id);
        kc.realm("couture-realm").users().get(id)
                .roles().realmLevel().add(asList(savedRoleRepresentation));
        System.out.println("role assigned  "+id);

        // claer the zone kcrole in keycloak
        // get object of userpresentation in realm
        UserRepresentation user=kc.realm("couture-realm").users().get(id).toRepresentation();
        // delete the value of kcrole in the object
        user.getAttributes().get("kcrole").set(0,"");
        // update the userreprsetation in realm with the new userRepresentation
        kc.realm("couture-realm").users().get(id).update(user);
        System.out.println("user updated");


    }
}
