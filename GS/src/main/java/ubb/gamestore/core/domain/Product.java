package ubb.gamestore.core.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product extends BaseEntity<Long> {
    @Column(length = 20)
    private String name;
    @Column(length = 20)
    private String description;
    @Column(length = 20)
    private int price;
    @Column()
    @Lob()
    private byte[] image;
}
