package org.sid.billingservice.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Couturier {
    private Long id;
    private String name;
    private String email;
}
