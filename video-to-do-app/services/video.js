const seeHome = 'http://192.168.0.105:8080/video/ideas';
const huffleHome = 'http://192.168.1.200:8080/video/ideas';

export default class VideoService {
  getIdeas() {
    return fetch(huffleHome)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDone() {
    return fetch(huffleHome)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
