package com.example.ebookstore.Testing;


import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Entity.Review;
import com.example.ebookstore.Service.BookService;
import com.example.ebookstore.Service.ReviewService;
import com.example.ebookstore.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AddReviewFuncTest {

    @Mock
    private UserService userService;

    @Mock
    private BookService bookService;

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private ReviewController reviewController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(reviewController).build();
    }

    @Test
    void testAddReview() throws Exception {
        
    }
}
