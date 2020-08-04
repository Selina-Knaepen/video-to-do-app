package be.huffle.todoapp.service;

import be.huffle.todoapp.dao.VideoDao;
import be.huffle.todoapp.model.Video;
import be.huffle.todoapp.resources.VideoResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoService {
	@Autowired
	private VideoDao videoDao;

	public List<VideoResource> getVideos() {
		return videoDao.findAll().stream().map(this::mapVideoToVideoResource).collect(Collectors.toList());
	}

	public List<VideoResource> getIdeaVideos() {
		List<VideoResource> allVideos = getVideos();
		List<VideoResource> ideaVideos = new ArrayList<>();

		for (VideoResource videoResource : allVideos) {
			if (videoResource.getState().toLowerCase().equals("ideas")) {
				ideaVideos.add(videoResource);
			}
		}

		return ideaVideos;
	}

	private VideoResource mapVideoToVideoResource(Video video) {
		VideoResource videoResource = new VideoResource();
		videoResource.setId(video.getId());
		videoResource.setTitle(video.getTitle());
		videoResource.setTotalFrames(video.getTotalFrames());
		videoResource.setCurrentFrame(video.getCurrentFrame());
		videoResource.setState(video.getVideoState().name());
		return videoResource;
	}
}
