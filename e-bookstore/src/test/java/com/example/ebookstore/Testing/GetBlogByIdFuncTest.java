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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class GetBlogByIdFuncTest {

    @Mock
    private BlogService blogService;

    @InjectMocks
    private BlogController blogController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetBlogByIdSuccess() {
        // Mocking blog details
        Users mockUser = new Users("testUser", "testPassword");
        mockUser.setId(1L);

        Blog mockBlog = new Blog();
        mockBlog.setBlogId(1L);
        mockBlog.setBlogTitle("Sample Title");
        mockBlog.setBlogDetails("Sample Details");
        mockBlog.setImagePath("sample/path.jpg");
        mockBlog.setAuthor(mockUser);

        when(blogService.getBlogById(1L)).thenReturn(Optional.of(mockBlog));

        ResponseEntity<Map<String, Object>> responseEntity = blogController.getBlogById(1L);

        // Assert the response
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());

        Map<String, Object> responseBody = responseEntity.getBody();
        assertEquals(1L, responseBody.get("blogId"));
        assertEquals("Sample Title", responseBody.get("blogTitle"));
        assertEquals("testUser", responseBody.get("authorName"));
        assertEquals("Sample Details", responseBody.get("blogDetails"));
        assertEquals("sample/path.jpg", responseBody.get("imagePath"));
    }
    @Test
    void testGetBlogByIdNotFound() {
        when(blogService.getBlogById(2L)).thenReturn(Optional.empty());

        ResponseEntity<Map<String, Object>> responseEntity = blogController.getBlogById(2L);

        // Assert the response for not found scenario
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals("Blog with given id not found", ((Map<String, Object>) responseEntity.getBody()).get("message"));
    }
}
