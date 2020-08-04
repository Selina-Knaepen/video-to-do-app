package be.huffle.todoapp.rest;

import be.huffle.todoapp.resources.VideoResource;
import be.huffle.todoapp.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "video")
public class VideoRest {
	@Autowired
	private VideoService videoService;

	@GetMapping("ideas")
	public List<VideoResource> getIdeas() {
		return videoService.getIdeaVideos();
	}
}
