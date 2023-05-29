const huffleHomeVideo = 'https://video-to-do-app.seeseepuff.be/video/';
const huffleHomeLabel = 'https://video-to-do-app.seeseepuff.be/labelTag/';

export default class VideoService {
  getAllLabels() {
    return fetch(huffleHomeLabel + 'all')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getByLabelId(id) {
    return fetch(huffleHomeVideo + '?id=' + id)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getIdeas() {
    return fetch(huffleHomeVideo + 'ideas')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDone() {
    return fetch(huffleHomeVideo + 'done')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDoing() {
    return fetch(huffleHomeVideo + 'doing')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createIdea(title, totalFrames, description, hasScript, labelName) {
    return fetch(huffleHomeVideo + 'ideas', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        totalFrames: totalFrames,
        description: description,
        script: hasScript,
        labelTagName: labelName
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
        .then(error => {
          throw new Error(error.message);
        });
      }
    });
  }

  moveIdeaToDoing(id) {
    return fetch(huffleHomeVideo + 'ideaToDoing/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
        .then(error => {
          throw new Error(error.message);
        });
      }
    });
  }

  moveDoingToDone(id) {
    return fetch(huffleHomeVideo + 'doingToDone/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
        .then(error => {
          throw new Error(error.message);
        });
      }
    });
  }

  editVideo(id, title, totalFrames, currentFrame, description, hasScript, labelTagName) {
    return fetch(huffleHomeVideo + 'edit/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        totalFrames: totalFrames,
        currentFrame: currentFrame,
        description: description,
        script: hasScript,
        labelTagName: labelTagName
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
        .then(error => {
          throw new Error(error.message);
        });
      }
    });
  }

  deleteIdea(id) {
    return fetch(huffleHomeVideo + 'ideas/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
