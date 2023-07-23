package org.sid.couturierservice;

import org.sid.couturierservice.entities.Couturier;
import org.sid.couturierservice.entities.Review;
import org.sid.couturierservice.repositories.CouturierRepository;
import org.sid.couturierservice.repositories.ReviewRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@SuppressWarnings("ALL")
@SpringBootApplication
public class CouturierServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(CouturierServiceApplication.class, args);
    }
   // @Bean
    public CommandLineRunner commandLineRunner(CouturierRepository couturierRepository, ReviewRepository reviewRepository, RepositoryRestConfiguration restConfiguration){
        return args -> {
            // afficher id
            restConfiguration.exposeIdsFor(Couturier.class);
            // create gallery
            List<String> gallery = Arrays.asList("image1","image2","image3");
            // create Couturier
            Couturier couturier =new Couturier();
            couturier.setName("mouad");
            couturier.setEmail("med@gmail.com");
            couturier.setAdresse("45 salam casa");
            couturier.setPhoto("images/mouad.jpg");
            couturier.setHomePhone("0505050505");
            couturier.setGallery(gallery);
            Couturier sCouturier =couturierRepository.save(couturier);

            // create reviews add couturier to review
            List<Review> reviews =Arrays.asList(new Review(null,"amal",0,"9","goood!",sCouturier),
            new Review(null,"sara",0,"9","awesome!",sCouturier));
            List<Review> reviewList= reviewRepository.saveAll(reviews);

            // 2eme couturue
            Couturier c =new Couturier();
            c.setName("mouad");
            c.setEmail("med@gmail.com");
            c.setAdresse("45 salam casa");
            c.setPhoto("images/mouad.jpg");
            c.setHomePhone("0505050505");
            c.setGallery(gallery);
            Couturier s =couturierRepository.save(c);
            List<Review> rs =Arrays.asList(new Review(null,"amal",0,"9","gonnnnnood!",s),
                    new Review(null,"sara",0,"9","wow!",s));
            List<Review> lst= reviewRepository.saveAll(rs);

        };
    }
}
