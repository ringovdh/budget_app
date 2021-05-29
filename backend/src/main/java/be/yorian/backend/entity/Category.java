package be.yorian.backend.entity;

import javax.persistence.*;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    public String label;

    public Category() {}

    public Category(String label) {
        this.label = label;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLabel() { return label; }

    public void setLabel(String label) {
        this.label = label;
    }
}
