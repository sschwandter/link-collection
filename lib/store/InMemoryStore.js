"use strict";
class InMemoryStore {
  constructor() {}

  async initialize() {
    this.videos = [];
  }

  async registerVideo({ video }) {
    this.videos.push(video);
  }

  async getVideos() {
    return this.videos;
  }
}

export { InMemoryStore };
