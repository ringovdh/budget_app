package be.yorian.backend.service.impl;

import be.yorian.backend.entity.Category;
import be.yorian.backend.repository.CategoryRepository;
import be.yorian.backend.service.CategoryService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    
    private final CategoryRepository categoryRepository;
    
    
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
    	this.categoryRepository = categoryRepository;
	}

    
    @Override
    public List<Category> getCategories() {
		return (List<Category>) categoryRepository.findAll(sortByLabel());
	}
    
    @Override
	public Optional<Category> getCategory(long category_id) {
		return categoryRepository.findById(category_id);
	}
    
    @Override
	public Category saveCategory(Category category) {
        return categoryRepository.save(category);
	}

	@Override
    public Category updateCategory(Category category) {
        
		if (categoryRepository.findById(category.getId()).isPresent()) {
            Category existingCategory = categoryRepository.findById(category.getId()).get();
            existingCategory.setLabel(category.getLabel());
            return categoryRepository.save(existingCategory);
        } else {
            return null;
        }
    }

	@Override
	public void deleteCategory(long category_id) {
		categoryRepository.deleteById(category_id);
		
	}

	
	private Sort sortByLabel() {
        return Sort.by("label").ascending();
    }	
	
}
