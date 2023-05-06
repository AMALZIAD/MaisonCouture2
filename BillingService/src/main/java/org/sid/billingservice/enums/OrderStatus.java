package org.sid.billingservice.enums;

import java.util.Random;

public enum OrderStatus {
    CREE, VALIDE , ENCOURS, TERMINE, ANNULE, LIVRE;
    /*
    * CREE : btn :valide/ or btn annule
    * annule :  annule history
    * VALIDE ; valide /btn traiter
    * ENCOURS: btn TERMINE,
    * Termine : btn LIVRE;
    * LIVRE/ : history
    * */
    private static final Random PRNG = new Random();
    private static final OrderStatus[] statuses = values();
    public static OrderStatus randomStatus() {
        return statuses[PRNG.nextInt(statuses.length)];
    }
}
