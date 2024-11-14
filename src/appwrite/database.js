import { Client, Databases, ID, Query, Storage } from "appwrite"; // importing all the service objects

import config from "../config/config.js"; // importing the .env variables

export class DatabaseService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId); // connecting the database for client registration
    this.database = new Databases(this.client);
    this.storage = new Storage(this.storage);
  }

  // method to create new post a.k.a. Create Blog method
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        // createDocument(databaseid, collectionid, documentid, {content to be stored})
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: createPost :: error :", error);
    }
  }

  // method to update an existing post a.k.a. Update Blog Method
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        // updateDocument(databaseid, collectionid, documentid, {content to be changed})
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service error :: updatePost :: error :", error);
    }
  }

  // method to delete an existing post a.k.a. Delete Blog Method
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.databaseId,
        config.collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service error :: deletePost :: error :", error);
      return false;
    }
  }

  // method to look for a single existing post a.k.a. Get Blog Method
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.databaseId,
        config.collectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service error :: getPost :: error :", error);
      return false;
    }
  }

  // method to fetch all the post with status of active a.k.a. Get Posts method
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.databaseId,
        config.collectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service error :: getPosts :: error :", error);
      return false;
    }
  }

  // file upload and delete methods

  // method to upload an image to a post a.k.a. File Upload method
  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.bucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service error :: uploadFile :: error :", error);
      return false;
    }
  }

  // method to delete an image from a post a.k.a. File Delete method
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service error :: deleteFile :: error :", error);
      return false;
    }
  }

  // method to preview an image from a post a.k.a. File Preview method
  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.bucketId, fileId);
  }
}

const databaseService = new DatabaseService();
export default databaseService;
