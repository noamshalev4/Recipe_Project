package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private IngredientType ingredientType;
    private int amount;

    @Enumerated(EnumType.STRING)
    private IngredientCondition ingredientCondition;
    private String imageURL;

    @ManyToMany(mappedBy = "ingredients")
    private Set<Recipe> recipes;
}
