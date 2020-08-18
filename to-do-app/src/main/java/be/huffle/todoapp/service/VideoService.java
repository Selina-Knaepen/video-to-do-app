package be.huffle.todoapp.service;

import be.huffle.todoapp.dao.VideoDao;
import be.huffle.todoapp.exceptions.InvalidVideoException;
import be.huffle.todoapp.model.Video;
import be.huffle.todoapp.model.VideoState;
import be.huffle.todoapp.resources.VideoCreateResoure;
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

	public List<VideoResource> getIdeaVideos() {
		return videoDao.findVideoByVideoState(VideoState.IDEA)
				.stream()
				.map(this::mapVideoToVideoResource)
				.collect(Collectors.toList());
	}

	public List<VideoResource> getDoneVideos() {
		return videoDao.findVideoByVideoState(VideoState.DONE)
				.stream()
				.map(this::mapVideoToVideoResource)
				.collect(Collectors.toList());
	}

	public VideoResource createIdea(VideoCreateResoure videoCreateResoure) throws InvalidVideoException {
		if (videoCreateResoure.getTotalFrames() <= 0) {
			throw new InvalidVideoException("The video needs to have more than 0 frames");
		}

		Video video = new Video();
		video.setTitle(videoCreateResoure.getTitle());
		video.setTotalFrames(videoCreateResoure.getTotalFrames());
		video.setCurrentFrame(0);
		video.setVideoState(VideoState.IDEA);
		return mapVideoToVideoResource(videoDao.save(video));
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
