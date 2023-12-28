package com.example.ebookstore.Testing;

import com.example.ebookstore.Service.ReviewService;
import com.example.ebookstore.Controller.ReviewController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class DeleteReviewFuncTest {

    @InjectMocks
    private ReviewController reviewController;

    @Mock
    private ReviewService reviewService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(reviewController).build();
    }

    @Test
    void testDeleteReviewSuccess() throws Exception {
        Long reviewId = 1L;

        // No exception will be thrown, indicating successful deletion
        doNothing().when(reviewService).deleteReview(reviewId);

        mockMvc.perform(delete("/api/v2/reviews/delete/{reviewId}", reviewId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Deleted Successfully"));
    }
    @Test
    void testDeleteReviewConflict() throws Exception {
        Long reviewId = 2L;
        String errorMessage = "Review not found"; // This can be any error message you expect from the service

        // Mocking the service to throw an IllegalArgumentException
        doThrow(new IllegalArgumentException(errorMessage))
                .when(reviewService).deleteReview(reviewId);

        mockMvc.perform(delete("/api/v2/reviews/delete/{reviewId}", reviewId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value(errorMessage));
    }
}
