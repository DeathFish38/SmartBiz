package smartbiz.smartbiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import smartbiz.smartbiz.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);
    User findByPhone(String phone);
}
