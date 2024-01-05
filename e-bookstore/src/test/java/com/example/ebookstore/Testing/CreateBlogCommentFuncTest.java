package com.example.ebookstore.Testing;

import com.example.ebookstore.Controller.BlogCommentController;
import com.example.ebookstore.Entity.Blog;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BlogCommentService;
import com.example.ebookstore.Service.UserService;
import com.example.ebookstore.Service.BlogService;
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

public class CreateBlogCommentFuncTest {

    @Mock
    private UserService userService;

    @Mock
    private BlogService blogService;

    @Mock
    private BlogCommentService blogCommentService;

    @InjectMocks
    private BlogCommentController blogCommentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddCommentSuccess() {
        Long userId = 1L;
        Long blogId = 2L;
        String commentText = "Sample comment text";

        Users mockUser = new Users("testUser", "testPassword");
        mockUser.setId(userId);

        Blog mockBlog = new Blog();
        mockBlog.setBlogId(blogId);

        when(userService.getUsersById(userId)).thenReturn(Optional.of(mockUser));
        when(blogService.getBlogById(blogId)).thenReturn(Optional.of(mockBlog));

        Map<String, Object> mockComment = new HashMap<>();
        mockComment.put("commentText", commentText);

        when(blogCommentService.addComment(commentText, mockUser, mockBlog)).thenReturn(mockComment);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", userId);
        requestBody.put("commentText", commentText);

        ResponseEntity<Map<String, Object>> responseEntity = blogCommentController.addComment(blogId, requestBody);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(commentText, ((Map<String, Object>) responseEntity.getBody()).get("commentText"));
    }

    @Test
    void testAddCommentInvalidData() {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", null);
        requestBody.put("commentText", "Invalid comment");

        ResponseEntity<Map<String, Object>> responseEntity = blogCommentController.addComment(1L, requestBody);

        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals("Null values present", ((Map<String, Object>) responseEntity.getBody()).get("Message"));
    }

    // You can add more tests to handle other edge cases or scenarios.
}
