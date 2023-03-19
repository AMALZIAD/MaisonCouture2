package org.sid.couturierservice.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(types=Couturier.class,name ="fCouturier")
public interface CouturierProjection {
    public Long getId();
    public String getName();
    public String getEmail();
}
