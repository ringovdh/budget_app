package be.yorian.backend.client;

import be.yorian.backend.controller.impl.CategoryControllerImpl;
import be.yorian.backend.entity.Category;
import be.yorian.backend.service.impl.CategoryServiceImpl;
import be.yorian.backend.repository.StubCategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import static org.assertj.core.api.Assertions.*;
import java.util.List;
import java.util.Optional;

public class CategoryControllerTest {

    private CategoryControllerImpl controller;

    @BeforeEach
    public void setup() throws Exception {
        controller = new CategoryControllerImpl(new CategoryServiceImpl(new StubCategoryRepository()));
    }

    @Test
    public void getCategory() {
        Optional<Category> category = controller.getCategory(0);
        assertThat(category.get()).isNotNull();
        assertThat(category.get().getId()).isEqualTo(Long.valueOf(0));
        assertThat(category.get().getLabel()).isEqualTo("Lening");
    }

    @Test
    public void getAllCategories() {
        List<Category> categories = controller.getCategories();
        assertThat(categories).isNotNull();
        assertThat(categories.size()).isEqualTo(2);
        assertThat(categories.get(1).getId()).isEqualTo(Long.valueOf(1));
        assertThat(categories.get(1).getLabel()).isEqualTo("Voeding");
    }

    @Test
    public void saveCategory() {
        Category category = new Category("Huishouden");
        setupFakeRequest("http://localhost/categories");
        HttpEntity<?> result = controller.saveCategory(category);
        assertThat(result).isNotNull();
        assertThat(result.getHeaders().getLocation().toString()).isEqualTo("http://localhost/categories/3");
        //check status?
        List<Category> categories = controller.getCategories();
        assertThat(categories.size()).isEqualTo(3);
    }

    private void setupFakeRequest(String url) {
        String requestURI = url.substring(16);
        MockHttpServletRequest request = new MockHttpServletRequest("POST", requestURI);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
    }

}
