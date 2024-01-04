package com.example.ebookstore.Repository;

import com.example.ebookstore.Entity.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogCommentRepository extends JpaRepository<BlogComment,Long> {
}
