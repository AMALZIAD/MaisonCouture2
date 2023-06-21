package org.sid.billingservice.exceptions;

public class CustomerNotFoundException extends RuntimeException{
    public  CustomerNotFoundException(String message){
        super(message);
    }
}
