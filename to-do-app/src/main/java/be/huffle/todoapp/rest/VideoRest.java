package be.huffle.todoapp.rest;

import be.huffle.todoapp.exceptions.InvalidActionException;
import be.huffle.todoapp.exceptions.InvalidVideoException;
import be.huffle.todoapp.resources.VideoCreateResoure;
import be.huffle.todoapp.resources.VideoResource;
import be.huffle.todoapp.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

	@GetMapping("done")
	public List<VideoResource> getDone() { return videoService.getDoneVideos(); }

	@GetMapping("doing")
	public List<VideoResource> getDoing() {
		return videoService.getDoingVideos();
	}

	@PostMapping("ideas")
	public ResponseEntity<VideoResource> createIdea(@RequestBody VideoCreateResoure videoCreateResoure) {
		try {
			VideoResource videoResource = videoService.createIdea(videoCreateResoure);
			return new ResponseEntity<VideoResource>(videoResource, HttpStatus.CREATED);
		}
		catch (InvalidVideoException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@PutMapping("ideaToDoing/{id}")
	public ResponseEntity<VideoResource> moveIdeaToDoing(@PathVariable("id") long id) {
		try {
			VideoResource videoResource = videoService.moveIdeaToDoing(id);
			return new ResponseEntity<VideoResource>(videoResource, HttpStatus.OK);
		} catch (InvalidActionException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@PutMapping("doingToDone/{id}")
	public ResponseEntity<VideoResource> moveDoingToDone(@PathVariable("id") long id) {
		try {
			VideoResource videoResource = videoService.moveDoingToDone(id);
			return new ResponseEntity<VideoResource>(videoResource, HttpStatus.OK);
		} catch (InvalidActionException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@PutMapping("edit/{id}")
	public ResponseEntity<VideoResource> editVideo(@PathVariable("id") long id,
												   @RequestBody VideoCreateResoure videoCreateResoure) {
		try {
			VideoResource videoResource = videoService.editVideo(id, videoCreateResoure);
			return new ResponseEntity<VideoResource>(videoResource, HttpStatus.OK);
		} catch (InvalidVideoException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@DeleteMapping("ideas/{id}")
	public void deleteIdea(@PathVariable("id") long id) {
		videoService.deleteIdea(id);
	}
}
