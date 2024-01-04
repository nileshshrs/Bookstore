package com.example.ebookstore.Testing;

import com.example.ebookstore.Controller.BlogController;
import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BlogService;
import com.example.ebookstore.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AddBlogFuncTest {
    @Mock
    private UserService userService;

    @Mock
    private BlogService blogService;

    @InjectMocks
    private BlogController blogController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateBlogSuccess() {
        // Mocking user and blog details
        Users mockUser = new Users("testUser", "testPassword");
        mockUser.setId(1L);
        when(userService.getUsersById(1L)).thenReturn(Optional.of(mockUser));

        Blog mockBlog = new Blog();
        mockBlog.setBlogTitle("Sample Title");
        mockBlog.setBlogDetails("Sample Details");
        mockBlog.setImagePath("sample/path.jpg");
        mockBlog.setAuthor(mockUser);

        when(blogService.addBlog(anyString(), any(Users.class), anyString(), anyString()))
                .thenReturn(mockBlog);

        // Create a sample request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("blogTitle", "Sample Title");
        requestBody.put("blogDetails", "Sample Details");
        requestBody.put("imagePath", "sample/path.jpg");
        requestBody.put("userId", 1L);

        ResponseEntity<Object> responseEntity = blogController.createBlog(requestBody);

        // Assert the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        assertEquals("Sample Title", responseBody.get("blogTitle"));
        assertEquals("Sample Details", responseBody.get("blogDetails"));
        assertEquals("testUser", responseBody.get("authorName"));
        assertEquals("sample/path.jpg", responseBody.get("imagePath"));
    }
}
