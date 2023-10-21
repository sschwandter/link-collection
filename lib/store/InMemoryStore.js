"use strict";
class InMemoryStore {
  constructor() {}

  async initialize() {
    this.videos = [];
    this.playlists = [];
  }

  async registerVideo({ video }) {
    this.videos.push(video);
  }

  async addPlaylist({ playlist }) {
    this.playlists.push(playlist);
  }

  async getVideos() {
    return this.videos;
  }

  async getPlaylists() {
    return this.playlists;
  }
}

export { InMemoryStore };
