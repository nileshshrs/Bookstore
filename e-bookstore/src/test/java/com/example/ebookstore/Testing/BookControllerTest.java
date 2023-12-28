package com.example.ebookstore.Testing;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Service.BookService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController bookController;

    private MockMvc mockMvc;

    @Test
    void createBooks() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bookController).build();

        // Create a sample book for testing
        Book sampleBook = new Book();
        sampleBook.setTitle("Sample Book Title");
        sampleBook.setAuthor("Sample Author");
        // Set other necessary fields

        when(bookService.createBook(sampleBook)).thenReturn(sampleBook);

        // Perform the POST request to the /api/v2/books/add endpoint
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v2/books/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Sample Book Title\",\"author\":\"Sample Author\"}") // Add other fields as needed
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        // Print the response content
        System.out.println("Response Content: " + result.getResponse().getContentAsString());
    }

    @Test
    void putBook() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bookController).build();

        // Create a sample book for testing
        Long sampleBookId = 1L;
        Book updatedBook = new Book();
        updatedBook.setTitle("Updated Book Title");
        updatedBook.setAuthor("Updated Author");

        // Case 1: Successful update
        when(bookService.putBook(sampleBookId, updatedBook)).thenReturn(updatedBook);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v2/books/edit/{bookId}", sampleBookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Updated Book Title\",\"author\":\"Updated Author\"}")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Case 2: Exception thrown
        when(bookService.putBook(sampleBookId, updatedBook))
                .thenThrow(new IllegalArgumentException("Book not found"));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put("/api/v2/books/edit/{bookId}", sampleBookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Updated Book Title\",\"author\":\"Updated Author\"}")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Adjust the expected status code as needed
                .andReturn();

        // Print the response content
        System.out.println("Response Content: " + result.getResponse().getContentAsString());
    }

}

