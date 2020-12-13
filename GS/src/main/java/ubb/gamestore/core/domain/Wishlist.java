package ubb.gamestore.core.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Wishlist extends BaseEntity<Long> {
    @ManyToOne(fetch = FetchType.EAGER)
    private GSUser user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;
}
