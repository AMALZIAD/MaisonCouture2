package org.sid.rdvservice.exceptions;

public class RdvNotFoundException extends RuntimeException{
    public RdvNotFoundException(String message){
        super(message);
    }
}
