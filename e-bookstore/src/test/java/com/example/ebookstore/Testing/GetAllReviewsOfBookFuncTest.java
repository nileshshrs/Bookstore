package com.example.ebookstore.Testing;

import com.example.ebookstore.Service.BookService;
import com.example.ebookstore.Service.ReviewService;
import com.example.ebookstore.Controller.ReviewController;
import com.example.ebookstore.Entity.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class GetAllReviewsOfBookFuncTest {

    @InjectMocks
    private ReviewController reviewController;

    @Mock
    private ReviewService reviewService;

    @Mock
    private BookService bookService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(reviewController).build();
    }

    @Test
    void testGetAllReviewsOfBook() throws Exception {
        Long sampleBookId = 1L;

    }

    @Test
    void testGetAllReviewsOfBookNotFound() throws Exception {
        Long nonExistingBookId = 100L;
    }

    // Add more tests as needed, for example, to handle internal server errors.
}
