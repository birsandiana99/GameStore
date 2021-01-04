package ubb.gamestore.core.domain;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Review extends BaseEntity<Long>{
    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(foreignKey = @ForeignKey(name = "fk_user_review", foreignKeyDefinition = "foreign key /* FK */ (id) references gsuser"))
    private GSUser user;

    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(foreignKey = @ForeignKey(name = "fk_product_review", foreignKeyDefinition = "foreign key /* FK */ (id) references product"))
    private Product product;

    @Column(length = 500)
    private String text;
}
