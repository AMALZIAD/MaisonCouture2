package org.sid.rdvservice;

import org.sid.rdvservice.entities.Rdv;
import org.sid.rdvservice.enums.RdvStatus;
import org.sid.rdvservice.model.Couturier;
import org.sid.rdvservice.model.Customer;
import org.sid.rdvservice.repositories.RdvRepository;
import org.sid.rdvservice.services.CouturierRestClient;
import org.sid.rdvservice.services.CustomerRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;
import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class RdvServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(RdvServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(RdvRepository rdvRepository,
                                               RepositoryRestConfiguration restConfiguration,
                                               CouturierRestClient couturierRestClient,
                                               CustomerRestClient customerRestClient) {
        return args -> {
            // expose id
            restConfiguration.exposeIdsFor(Rdv.class);
            // get customes and couturies
            List<Customer> customers=customerRestClient.allCustomers().getContent().stream().toList();
            List<Couturier> couturies=couturierRestClient.allCouturiers().getContent().stream().toList();
            // create customer
            Rdv rdv = new Rdv();
            rdv.setRdvDate(new Date());
            rdv.setStatus(RdvStatus.PRIS);
            rdv.setHeure("10:30");
            Rdv srdv = rdvRepository.save(rdv);

        };
    }
}

