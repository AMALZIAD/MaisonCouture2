package org.sid.billingservice.enums;

import java.util.Random;

public enum OrderStatus {
    CREE, VALIDE , ENCOURS, ANNULE, TERMINE, LIVRE;

    private static final Random PRNG = new Random();
    private static final OrderStatus[] statuses = values();
    public static OrderStatus randomStatus() {
        return statuses[PRNG.nextInt(statuses.length)];
    }
}
