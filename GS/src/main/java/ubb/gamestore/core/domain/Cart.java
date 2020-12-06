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
    @ManyToOne(fetch = FetchType.EAGER)
    private GSUser user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;
}
