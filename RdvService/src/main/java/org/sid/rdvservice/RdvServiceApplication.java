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

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class RdvServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(RdvServiceApplication.class, args);
    }

    //@Bean
     CommandLineRunner commandLineRunner(RdvRepository rdvRepository,
                                               CouturierRestClient couturierRestClient,CustomerRestClient customerRestClient) {
        return args -> {
            List<Customer> customers=customerRestClient.allCustomers().getContent().stream().toList();
            List<Couturier> couturies=couturierRestClient.allCouturiers().getContent().stream().toList();
            System.out.println(couturies.get(0).toString());
            System.out.println(customers.get(0).toString());
            Random random=new Random();

            Rdv rdv=new Rdv();

            rdv.setCouturierId(couturies.get(random.nextInt(couturies.size())).getId());
            rdv.setCustomerId(customers.get(random.nextInt(customers.size())).getId());
            rdv.setStatus(RdvStatus.DISPO);
            rdv.setRdvDate(new Date());
            rdv.setHeure("15");
            Rdv savedRdv=rdvRepository.save(rdv );

            Rdv rd=new Rdv();
            rd.setCouturierId(couturies.get(random.nextInt(couturies.size())).getId());
            rd.setCustomerId(customers.get(random.nextInt(customers.size())).getId());
            rd.setStatus(RdvStatus.PRIS);
            rd.setRdvDate(new Date());
            rd.setHeure("16");
            rdvRepository.save(rd );


        };
    }
}

