package org.sid.customerservice.web;

import lombok.AllArgsConstructor;
import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.repositories.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController@AllArgsConstructor
public class CustomerRestController {
    CustomerRepository customerRepository;

    @PostMapping("/assignRole/{id}")
    public void saveOrder(@PathVariable String id){

        /*// get acces to keycloak admin interface
        Keycloak kc = KeycloakBuilder.builder() //
                .serverUrl("http://localhost:8080/") //
                .realm("master")//
                .username("admin") //
                .password("1234") //
                .clientId("admin-cli") //
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build()) //
                .build();
        // get the role
        RoleRepresentation savedRoleRepresentation =
                kc.realm("couture-realm").roles().get("CUSTOMER").toRepresentation();
        // asign role
        kc.realm("couture-realm").users().get(id)
                .roles().realmLevel().add(asList(savedRoleRepresentation));*/
    }
    @GetMapping("/customers")
       public  List<Customer> getCustomer() {
        return customerRepository.findAll();
    }
}
