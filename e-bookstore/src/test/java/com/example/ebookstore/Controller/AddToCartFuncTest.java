package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Cart;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BookService;
import com.example.ebookstore.Service.CartService;
import com.example.ebookstore.Service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AddToCartFuncTest {

    @Mock
    private UserService userService;

    @Mock
    private BookService bookService;

    @Mock
    private CartService cartService;

    @InjectMocks
    private CartController cartController;

    private MockMvc mockMvc;

    @Test
    void testAddToCartEndpoint() throws Exception {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cartController).build();

    }

}
