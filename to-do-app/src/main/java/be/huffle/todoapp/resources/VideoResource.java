package be.huffle.todoapp.resources;

public class VideoResource {
	private Long id;
	private String title;
	private int totalFrames;
	private int currentFrame;
	private String state;
	private String description;
	private boolean hasScript;
	private String labelTagName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getTotalFrames() {
		return totalFrames;
	}

	public void setTotalFrames(int totalFrames) {
		this.totalFrames = totalFrames;
	}

	public int getCurrentFrame() {
		return currentFrame;
	}

	public void setCurrentFrame(int currentFrame) {
		this.currentFrame = currentFrame;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getScript() {
		return hasScript;
	}

	public void setScript(boolean hasScript) {
		this.hasScript = hasScript;
	}

	public String getLabelTagName() {
		return labelTagName;
	}

	public void setLabelTagName(String labelTagName) {
		this.labelTagName = labelTagName;
	}
}
