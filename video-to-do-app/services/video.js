export default class VideoService {
  getIdeas() {
    return fetch('http://192.168.0.105:8080/video/ideas')
      .then((response) => response.json())
      .then((json) => {
        return json
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // async getIdeasAsync() {
  //   try {
  //     let response = await fetch (
  //       'http://192.168.0.105:8080/video/ideas'
  //     );
  //     let json = await response.json();
  //     return json.ideas;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
