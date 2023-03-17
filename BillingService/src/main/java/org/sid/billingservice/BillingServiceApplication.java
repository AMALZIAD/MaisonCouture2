package org.sid.billingservice;

import org.sid.billingservice.entities.Order;
import org.sid.billingservice.enums.Categorie;
import org.sid.billingservice.enums.OrderStatus;
import org.sid.billingservice.enums.Tenue;
import org.sid.billingservice.enums.TypeCouture;
import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.sid.billingservice.repositories.OrderRepository;
import org.sid.billingservice.services.CouturierRestClient;
import org.sid.billingservice.services.CustomerRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(BillingServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(OrderRepository orderRepository,
                            CouturierRestClient couturierRestClient,CustomerRestClient customerRestClient){
        return  args -> {
            List<Customer> customers=customerRestClient.allCustomers().getContent().stream().toList();
            List<Couturier> couturies=couturierRestClient.allCouturiers().getContent().stream().toList();
            System.out.println(couturies.get(0).toString());
            System.out.println(customers.get(0).toString());
            Random random=new Random();

                Order order=new Order();

                order.setCouturierId(couturies.get(random.nextInt(couturies.size())).getId());
                order.setCustomerId(customers.get(random.nextInt(customers.size())).getId());
                order.setStatus(OrderStatus.randomStatus());
                order.setOrderdate(new Date());
            order.setCategorie(Categorie.MAALEM);
            order.setTenue(Tenue.TEKCHITA);
            order.setTypecouture(TypeCouture.RANDA);
                Order savedOrder=orderRepository.save(order );
            Order o=new Order();

            o.setCouturierId(couturies.get(random.nextInt(couturies.size())).getId());
            o.setCustomerId(customers.get(random.nextInt(customers.size())).getId());
            o.setStatus(OrderStatus.randomStatus());
            o.setOrderdate(new Date());
            o.setCategorie(Categorie.COMPUTER);
            o.setTenue(Tenue.CAFTAN);
            o.setTypecouture(TypeCouture.KTTIB);
            orderRepository.save(o );


        };
    }

}
