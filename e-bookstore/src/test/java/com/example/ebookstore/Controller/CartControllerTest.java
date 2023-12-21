package com.example.ebookstore.Controller;

import com.example.ebookstore.Service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
public class CartControllerTest {

    @Mock
    private CartService cartService;

    @InjectMocks
    private CartController cartController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cartController).build();
    }
    @Test
    void deleteCart() throws Exception {
        Long sampleCartId = 1L;

        doNothing().when(cartService).deleteCart(sampleCartId); // Assuming deleteCart returns void or you can mock accordingly

        mockMvc.perform(delete("/api/v2/carts/delete/{cartId}", sampleCartId))
                .andExpect(status().isOk());

        verify(cartService, times(1)).deleteCart(sampleCartId);
    }

}
