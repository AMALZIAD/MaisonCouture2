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

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static java.util.Arrays.asList;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

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

    @PostMapping("/addPic")
    public Couturier addPic(@RequestBody Couturier couturier){
        System.out.println(couturier.getGallery());
        return  couturierRepository.save(couturier);
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

    // FILE TREATMENT
    // define location
    //public static final String DIRECTORY= "E:/MaisonCouture/web-app/src/res/";
    public static final String DIRECTORY= "web-app/src/res/";
    //define to upload file
    @PostMapping("/upload")
    //return list of names of files uploaded
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles) throws IOException {
        List<String> filenames=new ArrayList<>();
        for(MultipartFile file : multipartFiles){
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path fileStorage =get(DIRECTORY,filename).toAbsolutePath().normalize();
            System.out.println(fileStorage.toString());
            copy(file.getInputStream(),fileStorage,REPLACE_EXISTING);
            filenames.add(filename);
        }
        return ResponseEntity.ok().body(filenames);
    }

    //defile methos to download
    @GetMapping("downlaod/{filename}")
    public ResponseEntity<Resource>downloadFiles(@PathVariable("filename") String filename) throws IOException {
        Path filePath=get(DIRECTORY).resolve(filename);
        if(!Files.exists(filePath)){
            throw new FileNotFoundException((filename+"was not found on the server"));
        }
        Resource resource=  new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("File-Name",filename);
        httpHeaders.add(CONTENT_DISPOSITION,"attechement;File-Name="+resource.getFilename());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(httpHeaders).body(resource);
    }
}
