package org.sid.couturierservice.web;

import lombok.AllArgsConstructor;

import org.sid.couturierservice.entities.Review;
import org.sid.couturierservice.repositories.ReviewRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class CouturierRestController {

    ReviewRepository reviewRepository;
    @PostMapping("/reviews")
    public Review saveReview(@RequestBody Review review){
        System.out.println("hello from controller "+review.toString());
        return reviewRepository.save(review);
    }
}
