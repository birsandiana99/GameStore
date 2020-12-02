package ubb.gamestore.core.domain;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart extends BaseEntity<Long>{
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_user_cart", foreignKeyDefinition = "foreign key /* FK */ (id) references gsuser"))
    private GSUser GSUser_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_product_cart", foreignKeyDefinition = "foreign key /* FK */ (id) references product"))
    private Product Product_id;
}
