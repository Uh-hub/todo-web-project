//package com.example.todo.controller;
//
//import com.example.todo.dto.ResponseDTO;
//import com.example.todo.dto.TodoDTO;
//import com.example.todo.model.TodoEntity;
//import com.example.todo.service.TodoService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Slf4j
//@RestController
//@RequestMapping("todo")
//public class TodoController {
//
//    @Autowired
//    private TodoService service;
//
//    @PostMapping
//    public ResponseEntity<?>createTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto) {
//        try {
//            /*Post localhost:8080/todo
//             *{
//             * "title" : "My first todo",
//             * "done" : false
//             *  }
//             */
//            log.info("Log:createTodo entrance");
//            TodoEntity entity = TodoDTO.toEntity(dto);
//            log.info("Log:dto => entity ok!");
//            entity.setId(null);
//            entity.setUserId(userId);
//            List<TodoEntity> entities = service.create(entity);
//            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
//            log.info("Log:entities => dtos ok!");
//            //Response DTO를 생성한다.
//            /* {
//             * "error" : null,
//             * "data":[
//             *          {
//             *           "id" : "402809817ed71ddf017ed71dfe720000",
//             *           "title" : "My first todo",
//             *           "done" : false
//             *           }
//             * }
//             */
//            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
//            log.info("Log:responsedto ok!");
//
//            //HTTP Status 200상태로 response를 전송한다.
//            return ResponseEntity.ok().body(response);
//        } catch (Exception e) {
//            String error = e.getMessage();
//            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<?> retrieveTodo(@AuthenticationPrincipal String userId){
//        List<TodoEntity> entities = service.retrieve(userId);
//        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
//        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
//
//        //HTTP Status 200상태로 response를 전송한다.
//        return ResponseEntity.ok().body(response);
//    }
//
//    @PutMapping
//    public ResponseEntity<?> updateTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto){
//        try {
//            /* PUT localhost:8080/todo/update
//             * {
//             *        "id" : "?????????"
//             *        "title" : "Update first todo",
//             *        "done" : true
//             * }
//             */
//
//            //dto를 이용해 테이블에 저장하기 위한 entity 를 생성한다.
//            TodoEntity entity = TodoDTO.toEntity(dto);
//
//            //entity userId를 임시로 지정한다.
//            entity.setUserId(userId);
//
//            //service.create를 통해 repository에 entity 를 저장한다.
//            //이때 넘어오는 값이 없을 수도 있으므로 List 가 아닌 Optional로 한다.
//            List<TodoEntity> entities = service.update(entity);   //??????????
//
//            //entities 를 dtos로 스트림 변환한다.
//            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
//
//            //Response DTO를 생성한다.
//            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
//
//            //HTTP Status 200상태로 response를 전송한다.
//            return ResponseEntity.ok().body(response);
//        }catch (Exception e){
//            String error = e.getMessage();
//            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//
//    @DeleteMapping
//    public ResponseEntity<?> deleteTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto){
//        try{
//            TodoEntity entity = TodoDTO.toEntity(dto);
//            entity.setUserId(userId);
//            List<TodoEntity> entities = service.delete(entity);
//            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
//            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
//            return ResponseEntity.ok().body(response);
//        }catch (Exception e){
//            String error = e.getMessage();
//            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
//            return ResponseEntity.badRequest().body(response);
//        }
//    }
//
//}

package com.example.todo.controller;

import com.example.todo.dto.ResponseDTO;
import com.example.todo.dto.TodoDTO;
import com.example.todo.model.TodoEntity;
import com.example.todo.service.TodoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService service;

    @PostMapping
    public ResponseEntity<?> createTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto) {
        try {
            log.info("Log:createTodo entrance");
            TodoEntity entity = TodoDTO.toEntity(dto);
            log.info("Log:dto => entity ok!");
            entity.setId(null);
            entity.setUserId(userId);
            List<TodoEntity> entities = service.create(entity);
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            log.info("Log:entities => dtos ok!");
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
            log.info("Log:responsedto ok!");
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveTodo(@AuthenticationPrincipal String userId, @RequestParam String todoDate) {
        List<TodoEntity> entities = service.retrieveByDate(userId, todoDate);
        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto) {
        try {
            TodoEntity entity = TodoDTO.toEntity(dto);
            entity.setUserId(userId);
            List<TodoEntity> entities = service.update(entity);
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@AuthenticationPrincipal String userId, @RequestBody TodoDTO dto) {
        try {
            TodoEntity entity = TodoDTO.toEntity(dto);
            entity.setUserId(userId);
            List<TodoEntity> entities = service.delete(entity);
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
