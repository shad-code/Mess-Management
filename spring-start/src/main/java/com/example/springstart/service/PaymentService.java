package com.example.springstart.service;

import com.example.springstart.entity.Payment;
import com.example.springstart.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Order createOrder(double amount, String email) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (amount * 100)); // Convert to paise (Razorpay expects amount in paise)
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", true); // Enable automatic capture

        try {
            Order order = razorpayClient.orders.create(orderRequest); // Create the Razorpay order

            // Save payment details to your DB
            Payment payment = new Payment();
            payment.setOrderId(order.get("id"));
            payment.setAmount(amount);
            payment.setEmail(email);
            payment.setStatus("CREATED");
            payment.setPaymentDate(LocalDateTime.now());

            paymentRepository.save(payment); // Save the payment to DB

            return order; // Return the Razorpay Order object to frontend
        } catch (RazorpayException e) {
            throw new RazorpayException("Error creating Razorpay order: " + e.getMessage());
        }
    }
}
