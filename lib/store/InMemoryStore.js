"use strict";
class InMemoryStore {
  constructor() {}

  async initialize() {
    this.videos = [];
    this.playlists = [];
  }

  async createVideo({ video }) {
    this.videos.push(video);
  }

  async createPlaylist({ playlist }) {
    this.playlists.push(playlist);
  }

  async updatePlaylist({ playlist }) {
    const index = this.playlists.findIndex(
      (existingPlaylist) => existingPlaylist.id === playlist.id,
    );
    if (index >= 0) {
      this.playlists[index] = playlist;
    }
  }

  async getVideos() {
    return this.videos;
  }

  async getVideo({ id }) {
    return this.videos.find((video) => id === video.id);
  }

  async getPlaylist({ id }) {
    return this.playlists.find((playlist) => id === playlist.id);
  }

  async getPlaylists() {
    return this.playlists;
  }
}

export { InMemoryStore };
