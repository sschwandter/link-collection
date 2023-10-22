"use strict";
import { MongoClient } from "mongodb";

class MongoDbStore {
  constructor({ hostname, port, username, password, database }) {
    this.hostname = hostname;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
  }

  async initialize() {
    const connectionString = `mongodb://${this.username}:${this.password}@${this.hostname}:${this.port}/`;
    const client = new MongoClient(connectionString);
    await client.connect();
    const database = client.db(this.database);
    const videoCollection = database.collection("videos");
    this.videoCollection = videoCollection;
    const playlistCollection = database.collection("playlists");
    this.playlistCollection = playlistCollection;
  }

  async createVideo({ video }) {
    const videoDb = { _id: video.id, url: video.url };
    await this.videoCollection.insertOne(videoDb);
  }

  async createPlaylist({ playlist }) {
    const playlistDb = { _id: playlist.id, videos: playlist.videos };
    await this.playlistCollection.insertOne(playlistDb);
  }

  async updatePlaylist({ playlist }) {
    await this.playlistCollection.updateOne(
      { _id: playlist.id },
      { $set: { videos: playlist.videos } },
    );
  }

  async getVideos() {
    return (
      await this.videoCollection.find().project({ _id: 0 }).toArray()
    ).map((v) => {
      return { id: v._id, url: v.url };
    });
  }

  async getVideo({ id }) {
    const videoDb = await this.videoCollection.findOne({ _id: id });
    const video = { id: videoDb._id, url: videoDb.url };
    console.log(`Found video: ${JSON.stringify(video)}`);
    return video;
  }

  async getPlaylist({ id }) {
    const playlistDb = await this.playlistCollection.findOne({ _id: id });
    const playlist = { id: playlistDb._id, videos: playlistDb.videos };
    return playlist;
  }

  async getPlaylists() {
    return (await this.playlistCollection.find().toArray()).map((p) => {
      return { id: p._id, videos: p.videos };
    });
  }
}

export { MongoDbStore };
