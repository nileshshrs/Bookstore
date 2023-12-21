package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Cart;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Service.BookService;
import com.example.ebookstore.Service.CartService;
import com.example.ebookstore.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/carts")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final BookService bookService;

    @Autowired
    public CartController(CartService cartService, UserService userService, BookService bookService) {
        this.cartService = cartService;
        this.userService = userService;
        this.bookService = bookService;
    }
    //create cart item database
    @PostMapping("/add-to-cart")
    public ResponseEntity<Object> addToCart(@RequestBody Map<String, Object> requestBody) {
        try {
            Long userId = ((Number) requestBody.get("userId")).longValue();
            Long bookId = ((Number) requestBody.get("bookId")).longValue();
            int quantity = (int) requestBody.get("quantity");

            Optional<Users> userOptional = userService.getUsersById(userId);
            Optional<Book> bookOptional = bookService.getBookById(bookId);

            if (userOptional.isPresent() && bookOptional.isPresent()) {
                Users user = userOptional.get();
                Book book = bookOptional.get();

                Cart cartItem = cartService.addToCart(user, book, quantity);

                // Simplify the response to include specific fields
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("cartId", cartItem.getCartId());
                responseData.put("userId", user.getId());
                responseData.put("bookId", book.getBookId());
                responseData.put("title", book.getTitle());
                responseData.put("price", book.getPrice());
                responseData.put("imagePath", book.getImagePath());
                responseData.put("quantity", cartItem.getQuantity());
                responseData.put("total", cartItem.getTotal());

                return new ResponseEntity<>(responseData, HttpStatus.CREATED);
            } else {
                String errorMessage = "User or book not found.";
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", errorMessage);
                return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
            }
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }
    }
    //get all cart in database
    @GetMapping("/get-all")
    public ResponseEntity<List<Map<String, Object>>> getAllCarts() {
        List<Map<String, Object>> cartsData = cartService.getAllCarts();

        return new ResponseEntity<>(cartsData, HttpStatus.OK);
    }
    //get all cart for a particular user
    @GetMapping("/get-by-user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCartsByUserId(@PathVariable Long userId) {
        try {
            List<Map<String, Object>> cartsData = cartService.getCartsByUserId(userId);
            return new ResponseEntity<>(cartsData, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions or log errors
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PatchMapping("/update/{cartId}")
    public ResponseEntity<Object> updateCartQuantity(
            @PathVariable Long cartId,
            @RequestBody Map<String, Integer> requestBody
    ) {
        try {
            Integer newQuantity = requestBody.get("newQuantity");
            Cart updatedCart = cartService.updateCartQuantity(cartId, newQuantity);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart quantity updated successfully");
            response.put("cartId", updatedCart.getCartId());
            response.put("userId", updatedCart.getUser().getId());
            response.put("bookId", updatedCart.getBook().getBookId());
            response.put("title", updatedCart.getBook().getTitle());
            response.put("price", updatedCart.getBook().getPrice());
            response.put("imagePath", updatedCart.getBook().getImagePath());
            response.put("quantity", updatedCart.getQuantity());
            response.put("total", updatedCart.getTotal());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<Object> deleteCart(@PathVariable Long cartId) {
        try {
            cartService.deleteCart(cartId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Cart deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", errorMessage);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
}
