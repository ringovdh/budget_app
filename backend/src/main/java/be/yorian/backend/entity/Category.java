package be.yorian.backend.entity;

import javax.persistence.*;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    public String label;
    public String icon;
    public boolean fixedcost;
    public boolean indetails;

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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public boolean isFixedcost() {
        return fixedcost;
    }

    public void setFixedcost(boolean fixedcost) {
        this.fixedcost = fixedcost;
    }

    public boolean isIndetails() {
        return indetails;
    }

    public void setIndetails(boolean indetails) {
        this.indetails = indetails;
    }
}
