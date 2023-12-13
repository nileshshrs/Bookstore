package com.example.ebookstore.Controller;

import com.example.ebookstore.Entity.Book;
import com.example.ebookstore.Service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v2/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("add")
    public ResponseEntity<Object> createBooks(@RequestBody Book books){
        //Provide json according to format of Book entity(see the entity ok!!)
        try{
            Book createdBook=bookService.createBook(books);
            //Create book provided from json using repository in service
            //May produce exception(IllegalArgument)
            String successMessage="New Book was added to the system.";
            Map<String,Object> response=new HashMap<>();
            //Create hashmap to put multiple data ;here successmessage and book
            response.put("message",successMessage);
            response.put("books",createdBook);
            //fill hashmap
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            String errorMessage=e.getMessage();
            //in case of error get the error message
            Map<String,Object> errorResponse= new HashMap<>();
            errorResponse.put("message",errorMessage);
            //fill hashmap with response(error)
            return new ResponseEntity<>(errorResponse,HttpStatus.CONFLICT);
        }
    }

    @GetMapping("getAll")
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

//    public ResponseEntity<Book> getBookById()
}
