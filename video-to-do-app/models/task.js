export default class Task {
  id: number;
  title: string;
  thumbnailUrl: string;
  words: number;
  frames: number;
  description: string;

  constructor(id, title) {
    this.title = title;
    this.id = id;
  }
}
