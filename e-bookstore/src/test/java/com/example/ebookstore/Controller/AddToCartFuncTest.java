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

        // Sample request body for adding to cart
        HashMap<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", 1L);
        requestBody.put("bookId", 2L);
        requestBody.put("quantity", 1);

        // Mock service responses
        Users mockUser = new Users();
        when(userService.getUsersById(1L)).thenReturn(Optional.of(mockUser));

        Book mockBook = new Book();
        when(bookService.getBookById(2L)).thenReturn(Optional.of(mockBook));

        Cart mockCartItem = new Cart();
        when(cartService.addToCart(mockUser, mockBook, 1)).thenReturn(mockCartItem);

        // Perform POST request to /api/v2/carts/add-to-cart endpoint
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v2/carts/add-to-cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":1,\"bookId\":2,\"quantity\":1}")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        // Print the response content for debugging
        System.out.println("Response Content: " + result.getResponse().getContentAsString());

    }

}
