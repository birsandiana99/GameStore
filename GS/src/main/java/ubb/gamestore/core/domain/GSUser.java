package ubb.gamestore.core.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GSUser extends BaseEntity<Long>{
    @Column(length = 20)
    private String username;
    @Column(length = 20)
    private String password;
    @Column(length = 30)
    private String email;
    @Column(length = 20)
    private String name;
    private Integer age;
    private Boolean isAdmin;
}
