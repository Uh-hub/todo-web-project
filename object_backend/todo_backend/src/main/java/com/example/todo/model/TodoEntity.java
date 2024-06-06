//package com.example.todo.model;
//
////import javax.persistence.Entity;
////import javax.persistence.GeneratedValue;
////import javax.persistence.Id;
////import javax.persistence.Table;
//
//import org.hibernate.annotations.GenericGenerator;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Entity
//@Table(name ="Todo")
//public class TodoEntity {
//	@Id
//	@GeneratedValue(generator="system-uuid")  // 자동으로 id 성성
//	@GenericGenerator(name="system-uuid",strategy="uuid")
//	private String id;
//	private String userId;
//	private String title;
//	private boolean done;
//}

package com.example.todo.model;

import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Todo")
public class TodoEntity {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;
	private String userId;
	private String title;
	private boolean done;
	private String todoDate; // 날짜 필드 추가
}