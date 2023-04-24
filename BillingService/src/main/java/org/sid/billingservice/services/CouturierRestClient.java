package org.sid.billingservice.services;

import org.sid.billingservice.model.Couturier;
import org.sid.billingservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COUTURIER-SERVICE")
public interface CouturierRestClient {
    //@GetMapping(value = "/couturiers/{id}",headers = { })
    @GetMapping(value = "/couturiers/{id}")
    public Couturier couturierById(@PathVariable Long id);
    @GetMapping("/CouturierByIdkc/{id}")
    public Couturier getByIdkc(@PathVariable String id);

    @GetMapping("/couturiers")
    public PagedModel<Couturier> allCouturiers();

}
