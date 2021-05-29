package be.yorian.backend.controller;

import java.util.List;
import java.util.Optional;

import be.yorian.backend.entity.Category;
import org.springframework.http.ResponseEntity;

public interface CategoryController {

    public List<Category> getCategories();
    public Optional<Category> getCategory(long id);
    public ResponseEntity<Void> saveCategory(Category category);
    public Category updateCategory(Category category);
    public void deleteCategory(long category_id);
        
    
}
