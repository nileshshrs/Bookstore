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
        Long userId = 1L;
        Long bookId = 2L;
        String reviewText = "This is a sample review text.";

        Users mockUser = new Users();
        mockUser.setId(userId);

        Book mockBook = new Book();
        mockBook.setBookId(bookId);

        when(userService.getUsersById(userId)).thenReturn(Optional.of(mockUser));
        when(bookService.getBookById(bookId)).thenReturn(Optional.of(mockBook));

        when(reviewService.addReview(mockUser, mockBook, reviewText)).thenReturn(new Review()); // Assuming Review class has a default constructor

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", userId);
        requestBody.put("bookId", bookId);
        requestBody.put("reviewText", reviewText);

        mockMvc.perform(post("/api/v2/reviews/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"bookId\":2,\"reviewText\":\"This is a sample review text.\"}")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
