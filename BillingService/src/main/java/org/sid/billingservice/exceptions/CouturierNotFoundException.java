package org.sid.billingservice.exceptions;

public class CouturierNotFoundException extends RuntimeException{
    public CouturierNotFoundException(String message){
        super(message);
    }
}
