package org.sid.rdvservice.exceptions;

public class CustomerNotFoundException extends RuntimeException{
    public  CustomerNotFoundException(String message){
        super(message);
    }
}
