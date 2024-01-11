package com.example.ebookstore.Service;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Entity.Cart;
import com.example.ebookstore.Entity.Users;
import com.example.ebookstore.Repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }
    //add to cart
    public synchronized Cart addToCart(Users user, Book book, int quantity) {
        if (user == null || book == null || quantity <= 0) {
            throw new IllegalArgumentException("Invalid input parameters");
        }

        // Check if the same book is already in the cart for the user
        Cart existingCart = cartRepository.findByUserAndBook(user, book);

        if (existingCart != null) {
            // If the book is already in the cart, update the quantity and total
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            existingCart.setTotal(calculateTotal(book.getPrice(), existingCart.getQuantity()));
            return cartRepository.save(existingCart);
        } else {
            // If the book is not in the cart, create a new cart item
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setBook(book);
            newCart.setQuantity(quantity);
            newCart.setTotal(calculateTotal(book.getPrice(), quantity));
            return cartRepository.save(newCart);
        }
    }

    public synchronized List<Map<String, Object>> getAllCarts() {
        List<Map<String, Object>> cartsData = new ArrayList<>();

        // Fetch all carts from the repository
        List<Cart> carts = cartRepository.findAll();

        // Convert each cart to a simplified map and add it to the list
        for (Cart cart : carts) {
            Map<String, Object> cartData = new HashMap<>();
            cartData.put("cartId", cart.getCartId());
            cartData.put("userId", cart.getUser().getId());
            cartData.put("bookId", cart.getBook().getBookId());
            cartData.put("title", cart.getBook().getTitle());
            cartData.put("price", cart.getBook().getPrice());
            cartData.put("imagePath", cart.getBook().getImagePath());
            cartData.put("quantity", cart.getQuantity());
            cartData.put("total", cart.getTotal());

            cartsData.add(cartData);
        }

        return cartsData;
    }

    public synchronized List<Map<String, Object>> getCartsByUserId(Long userId) {
        List<Map<String, Object>> cartsData = new ArrayList<>();

        // Fetch carts by user ID from the repository
        List<Cart> carts = cartRepository.findByUserId(userId);

        // Convert each cart to a simplified map and add it to the list
        for (Cart cart : carts) {
            Map<String, Object> cartData = new HashMap<>();
            cartData.put("cartId", cart.getCartId());
            cartData.put("userId", cart.getUser().getId());
            cartData.put("bookId", cart.getBook().getBookId());
            cartData.put("title", cart.getBook().getTitle());
            cartData.put("price", cart.getBook().getPrice());
            cartData.put("imagePath", cart.getBook().getImagePath());
            cartData.put("quantity", cart.getQuantity());
            cartData.put("total", cart.getTotal());

            cartsData.add(cartData);
        }

        return cartsData;
    }


    public synchronized Cart updateCartQuantity(Long cartId, int newQuantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.setQuantity(newQuantity);
            cart.setTotal(calculateTotal(cart.getBook().getPrice(), newQuantity));

            return cartRepository.save(cart);
        } else {
            throw new IllegalArgumentException("Cart not found with ID: " + cartId);
        }
    }

    public synchronized void deleteCart(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);

        if (optionalCart.isPresent()) {
            cartRepository.deleteById(cartId);
        } else {
            throw new IllegalArgumentException("Cart not found with ID: " + cartId);
        }
    }
    private BigDecimal calculateTotal(BigDecimal price, int quantity) {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
