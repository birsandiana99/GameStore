package ubb.gamestore.core.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@MappedSuperclass
@Inheritance(strategy = InheritanceType.JOINED)
public class BaseEntity<ID extends Serializable> implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
}
