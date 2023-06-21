package org.sid.billingservice.services;

import org.sid.billingservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRestClient {
   // @GetMapping(value = "/customers/{id}",headers = { })
    @GetMapping(value = "/customers/{id}")
    public Customer customerById(@PathVariable Long id);

    @GetMapping("/customers")
    public PagedModel<Customer> allCustomers();

    @GetMapping("/CustomerByIdkc/{id}")
    public Customer findCustomerByIdkc(@PathVariable String id);

}
