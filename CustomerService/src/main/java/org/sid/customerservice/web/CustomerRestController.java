package org.sid.customerservice.web;

import lombok.AllArgsConstructor;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.repositories.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Arrays.asList;

@RestController@AllArgsConstructor

public class CustomerRestController {
  CustomerRepository rep;

    @PostMapping("/customers")
    public Customer saveCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        //asign role in keycloak and clear kcrole
        assignRole(customer.getIdkc());
        //save new user to bd
        return  rep.save(customer);
    }
    /*// check if customer exist in customer-bd
    @GetMapping("/findByIdkc/{id}")
    public Boolean existsByIdkc(@PathVariable String id){
        if (rep.existsByIdkc(id)){
            assignRole(id);
            return true;
        }
        return false;
    }*/
   // assign role customer to connected user
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
                kc.realm("couture-realm").roles().get("CUSTOMER").toRepresentation();
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
