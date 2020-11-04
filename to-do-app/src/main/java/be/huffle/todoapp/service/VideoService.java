package be.huffle.todoapp.service;

import be.huffle.todoapp.dao.LabelTagDao;
import be.huffle.todoapp.dao.VideoDao;
import be.huffle.todoapp.exceptions.InvalidActionException;
import be.huffle.todoapp.exceptions.InvalidVideoException;
import be.huffle.todoapp.model.LabelTag;
import be.huffle.todoapp.model.Video;
import be.huffle.todoapp.model.VideoState;
import be.huffle.todoapp.resources.VideoCreateResoure;
import be.huffle.todoapp.resources.VideoResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoService {
	@Autowired
	private VideoDao videoDao;
	@Autowired
	private LabelTagService labelTagService;

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

	public List<VideoResource> getDoingVideos() {
		return videoDao.findVideoByVideoState(VideoState.DOING)
				.stream()
				.map(this::mapVideoToVideoResource)
				.collect(Collectors.toList());
	}

	public List<VideoResource> getIdeasByLabelTagId(long id) {
		return videoDao.findVideoByLabelTagIdAndVideoState(id, VideoState.IDEA)
				.stream()
				.map(this::mapVideoToVideoResource)
				.collect(Collectors.toList());
	}

	public VideoResource createIdea(VideoCreateResoure videoCreateResoure) throws InvalidVideoException {
		if (videoCreateResoure.getTotalFrames() < 0) {
			throw new InvalidVideoException("The video needs to have more than 0 frames");
		}

		LabelTag labelTag = labelTagService.getLabelTagByName(videoCreateResoure.getLabelTagName());

		Video video = new Video();
		video.setTitle(videoCreateResoure.getTitle());
		video.setTotalFrames(videoCreateResoure.getTotalFrames());
		video.setDescription(videoCreateResoure.getDescription());
		video.setCurrentFrame(0);
		video.setVideoState(VideoState.IDEA);
		video.setScript(videoCreateResoure.getScript());
		video.setLabelTag(labelTag);
		return mapVideoToVideoResource(videoDao.save(video));
	}

	public VideoResource moveIdeaToDoing(long id) throws InvalidActionException {
		List<Video> doingVideos = videoDao.findVideoByVideoState(VideoState.DOING);
		if (doingVideos.size() < 2) {
			Video video = videoDao.findById(id).orElse(null);
			if (!video.getScript()) {
				throw new InvalidActionException("The video should have a script");
			} else if (video.getTotalFrames() == 0) {
				throw new InvalidActionException("The video should have a frame total to be moved to doing");
			}
			video.setVideoState(VideoState.DOING);
			return mapVideoToVideoResource(videoDao.save(video));
		} else {
			throw new InvalidActionException("There is already two videos being made");
		}
	}

	public VideoResource moveDoingToDone(long id) throws InvalidActionException {
		Video video = videoDao.findById(id).orElse(null);
		if (video != null && video.getCurrentFrame() != video.getTotalFrames()) {
			throw new InvalidActionException("Can't finish video when video isn't done 100%");
		}

		video.setVideoState(VideoState.DONE);
		return mapVideoToVideoResource(videoDao.save(video));
	}

	public VideoResource editVideo(long id, VideoCreateResoure videoCreateResoure) throws InvalidVideoException {
		if (videoCreateResoure.getTotalFrames() < videoCreateResoure.getCurrentFrame()) {
			throw new InvalidVideoException("The current frame cannot be higher than the total amount of frames");
		}

		Video video = videoDao.findById(id).orElse(null);
		if (video == null) {
			video = new Video();
			video.setVideoState(VideoState.IDEA);
		}

		LabelTag labelTag = labelTagService.getLabelTagByName(videoCreateResoure.getLabelTagName());

		video.setCurrentFrame(videoCreateResoure.getCurrentFrame());
		video.setTotalFrames(videoCreateResoure.getTotalFrames());
		video.setTitle(videoCreateResoure.getTitle());
		video.setDescription(videoCreateResoure.getDescription());
		video.setScript(videoCreateResoure.getScript());
		video.setLabelTag(labelTag);

		return mapVideoToVideoResource(videoDao.save(video));
	}

	public void deleteIdea(long id) {
		videoDao.deleteById(id);
	}

	private VideoResource mapVideoToVideoResource(Video video) {
		VideoResource videoResource = new VideoResource();
		videoResource.setId(video.getId());
		videoResource.setTitle(video.getTitle());
		videoResource.setTotalFrames(video.getTotalFrames());
		videoResource.setCurrentFrame(video.getCurrentFrame());
		videoResource.setState(video.getVideoState().name());
		videoResource.setDescription(video.getDescription());
		videoResource.setScript(video.getScript());
		LabelTag labelTag = video.getLabelTag();
		if (labelTag != null) {
			videoResource.setLabelTagName(labelTag.getName());
		}
		return videoResource;
	}
}
