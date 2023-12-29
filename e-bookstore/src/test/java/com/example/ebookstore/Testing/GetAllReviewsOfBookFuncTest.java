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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
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
        // Mocking BookService to return an existing book
        Book mockBook = new Book();  // Assuming you have a Book entity
        when(bookService.getBookById(sampleBookId)).thenReturn(Optional.of(mockBook));

        // Mocking ReviewService to return a list of reviews
        Map<String, Object> mockReview = Collections.singletonMap("key", "value");
        when(reviewService.getAllReviewsByBookId(sampleBookId)).thenReturn(Collections.singletonList(mockReview));

        // Perform the GET request and validate the response
        mockMvc.perform(get("/api/v2/reviews/getByBook/{bookId}", sampleBookId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].key").value("value"));
    }

    @Test
    void testGetAllReviewsOfBookNotFound() throws Exception {
        Long nonExistingBookId = 100L;

        // Mocking BookService to return an empty optional (indicating book not found)
        when(bookService.getBookById(nonExistingBookId)).thenReturn(Optional.empty());

        // Perform the GET request and validate the response for NOT_FOUND
        mockMvc.perform(get("/api/v2/reviews/getByBook/{bookId}", nonExistingBookId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
