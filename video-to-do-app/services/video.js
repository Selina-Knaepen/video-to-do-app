const seeHome = 'http://192.168.0.105:8080/video/';
const huffleHome = 'http://192.168.1.200:8080/video/';

export default class VideoService {
  getIdeas() {
    return fetch(huffleHome + 'ideas')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDone() {
    return fetch(huffleHome + 'done')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDoing() {
    return fetch(huffleHome + 'doing')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createIdea(title, totalFrames) {
    return fetch(huffleHome + 'ideas', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        totalFrames: totalFrames
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
    return fetch(huffleHome + 'ideaToDoing/' + id, {
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
    return fetch(huffleHome + 'doingToDone/' + id, {
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

  editVideo(id, title, totalFrames, currentFrame) {
    return fetch(huffleHome + 'edit/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        totalFrames: totalFrames,
        currentFrame: currentFrame
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
    return fetch(huffleHome + 'ideas/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
