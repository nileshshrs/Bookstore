package com.example.ebookstore.Testing;

import com.example.ebookstore.Service.BookService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class BookControllerDeleteFuncTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController bookController;

    private MockMvc mockMvc;

    @Test
    void deleteBookById() throws Exception {
        // Initialize the mocks and MockMvc
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bookController).build();

        // Set up a sample book ID for testing
        Long sampleBookId = 1L;

        // Mock the bookService.deleteBook method to do nothing when called
        doNothing().when(bookService).deleteBook(sampleBookId);

        // Perform the DELETE request to the /api/v2/books/delete/{bookId} endpoint
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v2/books/delete/{bookId}", sampleBookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()); // Expecting a 200 OK status

        // Mock the bookService.deleteBook method to throw an exception when called
        doThrow(new IllegalArgumentException("Book not found")).when(bookService).deleteBook(sampleBookId);

        // Perform the DELETE request again to test the failure scenario
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v2/books/delete/{bookId}", sampleBookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound()); // Expecting a 404 Not Found status
    }

}
