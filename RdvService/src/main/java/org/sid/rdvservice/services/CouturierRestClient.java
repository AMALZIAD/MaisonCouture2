package org.sid.rdvservice.services;


import org.sid.rdvservice.model.Couturier;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COUTURIER-SERVICE")
public interface CouturierRestClient {
    //@GetMapping(value = "/couturiers/{id}",headers = { })
    @GetMapping(value = "/couturiers/{id}")
    public Couturier couturierById(@PathVariable Long id);

    @GetMapping("/couturiers")
    public PagedModel<Couturier> allCouturiers();

}
