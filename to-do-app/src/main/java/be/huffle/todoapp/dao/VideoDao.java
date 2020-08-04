package be.huffle.todoapp.dao;

import be.huffle.todoapp.model.Video;
import be.huffle.todoapp.model.VideoState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoDao extends JpaRepository<Video, Long> {
	List<Video> findVideoByVideoState(VideoState videoState);
}
