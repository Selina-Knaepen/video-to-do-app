export default class VideoService {
  getIdeas() {
    return fetch('http://192.168.0.105:8080/video/ideas')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDone() {
    return fetch('http://192.168.0.105:8080/video/done')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
