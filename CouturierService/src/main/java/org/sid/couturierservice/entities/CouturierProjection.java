package org.sid.couturierservice.entities;

import org.springframework.data.rest.core.config.Projection;


import java.util.List;

@Projection(types=Couturier.class,name ="fCouturier")
public interface CouturierProjection {
    public Long getId();
    public String getName();
    public String getEmail();
    public String getadresse();
    public String gethomePhone();
    public String getprofile();
    public double getrate();
    public String getphoto();
    public List<String> getgallery();
}
