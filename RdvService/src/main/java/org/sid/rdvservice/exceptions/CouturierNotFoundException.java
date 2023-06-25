package org.sid.rdvservice.exceptions;

public class CouturierNotFoundException extends RuntimeException{
    public CouturierNotFoundException(String message){
        super(message);
    }
}
