package org.sid.billingservice.entities;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Details {
    private String numCmd;
    private String name;
    private String datecmd;
    private String email;
    private String contact;
    private String etat;
    private String prix;
    private String tenue;

    public String getNumCmd() {
        return numCmd;
    }

    public String getName() {
        return name;
    }

    public String getDatecmd() {
        return datecmd;
    }

    public String getEmail() {
        return email;
    }

    public String getContact() {
        return contact;
    }

    public String getEtat() {
        return etat;
    }

    public String getPrix() {
        return prix;
    }

    public String getTenue() {
        return tenue;
    }
}
