package org.sid.customerservice.web;

import lombok.AllArgsConstructor;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.entities.Mesure;
import org.sid.customerservice.repositories.CustomerRepository;
import org.sid.customerservice.repositories.MesureRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static java.util.Arrays.asList;

@RestController@AllArgsConstructor
public class CustomerRestController {
  CustomerRepository rep;
    MesureRepository mesureRepository;

    // get all customers
    @GetMapping("/customers")
    public List <Customer> getAll(){
        return rep.findAll();
    }

    // get Customer byIdkc for updating mesure!!!!
    @GetMapping("/CustomerByIdkc/{id}")
    public Customer findCustomerByIdkc(@PathVariable String id){
        System.out.println("im inside customer service  --- customer by idkc");
        return rep.findCustomerByIdkc(id);
    }

    @PostMapping("/customers")
    public Customer saveCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        //asign role in keycloak and clear kcrole
        assignRole(customer.getIdkc());
        //save new user to bd
        Mesure m=new Mesure();
       mesureRepository.save(m);
        customer.setMesure(m);
        return  rep.save(customer);
    }
    @PostMapping("/editCustomer")
    public Customer editCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        return  rep.save(customer);
    }

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

    @PostMapping("/upload")
    //return list of names of files uploaded
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles) throws IOException {
        String DIRECTORY= "web-app/src/assets/profile/";

        List<String> filenames=new ArrayList<>();
        for(MultipartFile file : multipartFiles){
            System.out.println(file.getName());
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            System.out.println(filename);
            Path fileStorage =get(DIRECTORY,filename).toAbsolutePath().normalize();
            System.out.println(fileStorage.toString());
            copy(file.getInputStream(),fileStorage,REPLACE_EXISTING);
            filenames.add(filename);
        }
        return ResponseEntity.ok().body(filenames);
    }
}
