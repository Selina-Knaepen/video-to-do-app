package be.huffle.todoapp.dao;

import be.huffle.todoapp.model.Video;
import be.huffle.todoapp.model.VideoState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoDao extends JpaRepository<Video, Long> {
}
