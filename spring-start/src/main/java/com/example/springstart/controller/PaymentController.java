package com.example.springstart.controller;

import com.example.springstart.service.PaymentService;
import com.razorpay.Order;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(Authentication authentication, @RequestBody PaymentRequest paymentRequest) {
        System.out.println("Received payment request for amount: " + paymentRequest.getAmount());

        try {
            String email = authentication.getName();
            Order order = paymentService.createOrder(paymentRequest.getAmount(), email);

            PaymentResponse response = new PaymentResponse();
            response.setId(order.get("id"));
            response.setAmount(order.get("amount"));
            response.setCurrency(order.get("currency"));

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating Razorpay order: " + e.getMessage());
        }
    }



//    @PostMapping("/verify")
//    public ResponseEntity<String> verifyPayment(
//            Authentication authentication,
//            @RequestParam String razorpay_payment_id,
//            @RequestParam String razorpay_order_id,
//            @RequestParam String razorpay_signature
//    ) {
//        try {
//            String email = authentication.getName(); // Optionally log the email for tracking
//            paymentService.updatePayment(razorpay_payment_id, razorpay_order_id, razorpay_signature);
//            return ResponseEntity.ok("Payment verified successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment verification failed: " + e.getMessage());
//        }
//    }

    @Setter
    @Getter
    public static class PaymentRequest {
        private double amount;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PaymentResponse {
        private String id;
        private int amount;
        private String currency;
    }

}
