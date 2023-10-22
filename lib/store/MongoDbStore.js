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
    await this.videoCollection.insertOne(toDb(video));
  }

  async createPlaylist({ playlist }) {
    await this.playlistCollection.insertOne(toDb(playlist));
  }

  async updatePlaylist({ playlist }) {
    await this.playlistCollection.updateOne(
      { _id: playlist.id },
      { $set: { videos: playlist.videos } },
    );
  }

  async getVideos() {
    return fromDb(await this.videoCollection.find().toArray());
  }

  async getVideo({ id }) {
    const videoDb = await this.videoCollection.findOne({ _id: id });
    return fromDb(videoDb);
  }

  async getPlaylist({ id }) {
    const playlistDb = await this.playlistCollection.findOne({ _id: id });
    return fromDb(playlistDb);
  }

  async getPlaylists() {
    return fromDb(await this.playlistCollection.find().toArray());
  }
}

const toDb = (object) => {
  /**
   * Swaps id property to an _id property for MongoDB
   * @returns
   */
  const toDbOne = (object) => {
    const { id, ...rest } = object;
    return { _id: id, ...rest };
  };

  return acceptOneOrMany(object, toDbOne);
};

const fromDb = (document) => {
  /**
   * Swaps _id property to an id property for the business logic
   * @returns
   */
  const fromDbOne = (document) => {
    const { _id, ...rest } = document;
    return { id: _id, ...rest };
  };
  return acceptOneOrMany(document, fromDbOne);
};

/**
 * Applies function fn to the single passed object or array,
 * returns a single object or array accordingly
 *
 * @param {*} object Single object or array
 * @param {*} fn function to be applied
 * @returns
 */
const acceptOneOrMany = (object, fn) => {
  if (Array.isArray(object)) {
    return object.map((o) => fn(o));
  } else {
    return fn(object);
  }
};

export { MongoDbStore };
