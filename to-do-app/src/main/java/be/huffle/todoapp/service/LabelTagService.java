package be.huffle.todoapp.service;

import be.huffle.todoapp.dao.LabelTagDao;
import be.huffle.todoapp.model.LabelTag;
import be.huffle.todoapp.resources.LabelTagResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabelTagService {
	@Autowired
	private LabelTagDao labelTagDao;

	public List<LabelTagResource> getAllLabelTags() {
		return labelTagDao.findAll()
				.stream()
				.map(this::mapLabelTagToLabelTagResource)
				.collect(Collectors.toList());
	}

	public LabelTag getLabelTagByName(String name) {
		LabelTag labelTag = labelTagDao.findLabelTagByName(name);
		if (labelTag == null) {
			if (name == null || name.equals("")) {
				return null;
			}
			labelTag = new LabelTag();
			labelTag.setName(name);
			labelTag = labelTagDao.save(labelTag);
		}
		return labelTag;
	}

	private LabelTagResource mapLabelTagToLabelTagResource(LabelTag labelTag) {
		LabelTagResource labelTagResource = new LabelTagResource();
		labelTagResource.setName(labelTag.getName());
		labelTagResource.setId(labelTag.getId());

		return labelTagResource;
	}
}
