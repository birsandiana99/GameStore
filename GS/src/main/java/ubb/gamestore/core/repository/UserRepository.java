package ubb.gamestore.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.gamestore.core.domain.GSUser;

public interface UserRepository extends JPARepository<GSUser, Long> {
}
