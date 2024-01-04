package com.example.ebookstore.Testing;

import com.example.ebookstore.Service.BlogService;
import com.example.ebookstore.Controller.BlogController;
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

public class DeleteBlogTest {

    @InjectMocks
    private BlogController blogController;

    @Mock
    private BlogService blogService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(blogController).build();
    }

    @Test
    void testDeleteBlogSuccess() throws Exception {
        Long blogId = 1L;

        // No exception will be thrown, indicating successful deletion
        doNothing().when(blogService).deleteBlog(blogId);

        mockMvc.perform(delete("/api/v2/blogs/delete/{blogId}", blogId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Blog Deleted Successfully"));
    }

    @Test
    void testDeleteBlogNotFound() throws Exception {
        Long blogId = 2L;
        String errorMessage = "Blog not found"; // This can be any error message you expect from the service

        // Mocking the service to throw an IllegalArgumentException
        doThrow(new IllegalArgumentException(errorMessage))
                .when(blogService).deleteBlog(blogId);

        mockMvc.perform(delete("/api/v2/blogs/delete/{blogId}", blogId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(errorMessage));
    }
}
