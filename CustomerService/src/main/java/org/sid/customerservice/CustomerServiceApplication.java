package org.sid.customerservice;

import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.entities.Mesure;
import org.sid.customerservice.repositories.CustomerRepository;
import org.sid.customerservice.repositories.MesureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }
    //@Bean
    public CommandLineRunner commandLineRunner(CustomerRepository customerRepository,
                                               MesureRepository mesureRepository, RepositoryRestConfiguration restConfiguration){
        return args -> {
            // expose id
            restConfiguration.exposeIdsFor(Customer.class);
            // create customer
            Customer customer=new Customer();
            customer.setName("lamiss");
            customer.setEmail("lamiss@gmail.com");
            customer.setPhone("0606060606");
            customer.setAdresse("123 haha rabat");
            customer.setPhoto("images/lamiss.png");


            // create Mesure
            Mesure mesure=new Mesure();
            mesure.setHauteur(12.45);
            mesure.setTourEpaule(80.02);
            mesure.setTourTaille(11.00);
            customer.setMesure(mesure);
            mesureRepository.save(mesure);
            Customer sCustomer=customerRepository.save(customer);
                System.out.println(sCustomer.toString());

        };
    }
}
