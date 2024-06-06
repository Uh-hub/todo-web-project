//package com.example.todo.persistence;
//
//import com.example.todo.model.TodoEntity;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface TodoRepository extends JpaRepository<TodoEntity, String> {
//
//    @Query("select t from TodoEntity t where t.userId = ?1")
//    List<TodoEntity>findByUserId(String userId);
//}


package com.example.todo.persistence;

import com.example.todo.model.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {

    @Query("select t from TodoEntity t where t.userId = ?1")
    List<TodoEntity> findByUserId(String userId);

    @Query("select t from TodoEntity t where t.userId = ?1 and t.todoDate = ?2")
    List<TodoEntity> findByUserIdAndTodoDate(String userId, String todoDate);
}