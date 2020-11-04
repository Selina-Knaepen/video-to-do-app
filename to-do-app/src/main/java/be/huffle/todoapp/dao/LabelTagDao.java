package be.huffle.todoapp.dao;

import be.huffle.todoapp.model.LabelTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelTagDao extends JpaRepository<LabelTag, Long> {
	LabelTag findLabelTagByName(String name);
}
