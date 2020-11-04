package be.huffle.todoapp.rest;

import be.huffle.todoapp.resources.LabelTagResource;
import be.huffle.todoapp.service.LabelTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "labelTag")
public class LabelTagRest {
	@Autowired
	private LabelTagService labelTagService;

	@GetMapping("all")
	public List<LabelTagResource> getAll() {
		List<LabelTagResource> resources = labelTagService.getAllLabelTags();
		return resources;
	}
}
