package org.sid.billingservice.enums;

import java.util.Random;

public enum OrderStatus {
    CREE, VALIDE , ENCOURS, TERMINE, LIVRE , ANNULE;
    /*
    * CREE 0 btn :valide/ or btn annule
    * annule 5 :  annule history
    * VALIDE 1; valide /btn traiter
    * ENCOURS 2: btn TERMINE,
    * Termine 3 : btn LIVRE;
    * LIVRE 4/ : history
    * */
    private static final Random PRNG = new Random();
    private static final OrderStatus[] statuses = values();
    public static OrderStatus randomStatus() {
        return statuses[PRNG.nextInt(statuses.length)];
    }
}
