package org.sid.customerservice.entities;

import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(types=Mesure.class,name ="fMesure")
public interface MesureProj {

    public Long getId();
    public String getTourEpaule();
    public String getTourTaille();
    public String getHauteur();

}
