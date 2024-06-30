const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");
const mongoose = require("mongoose");

// ******************* CREATE A POST **********
// post: api/posts
// Protected
const createPost = async (req, res, next) => {
  try {
    let {
      title,
      city,
      type,
      breed,
      gender,
      age,
      phoneNumber,
      sterilize,
      description,
    } = req.body;
    if (!title || !city || !type || !gender || !phoneNumber || !description) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail", 422)
      );
    }
    if (age > 30 || age < 0) {
      return next(new HttpError("age values must be between 0 and 30"));
    }
    const { thumbnail } = req.files;

    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnail too big. File should be less than 2mb.")
      );
    }
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            city,
            type,
            breed,
            gender,
            age,
            phoneNumber,
            sterilize,
            description,
            creator: req.user.id,
            thumbnail: newFilename,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created", 422));
          }
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* Get ALL POST **********
// get: api/posts
// UnProtected
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 }); // en son eklenen önce
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* Get single post **********
// get: api/posts/:id
// UnProtected
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found.", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* Get Posts by types **********
// get: api/posts/types/:type
// UnProtected
const getCatPosts = async (req, res, next) => {
  try {
    const { type } = req.params;
    const typePosts = await Post.find({ type }).sort({ createdAt: -1 });
    res.status(200).json(typePosts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* get user POST **********
// get: api/posts/users/:id
// UnProtected
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* Edit A POST **********
// patch: api/posts/:id
// Protected
const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFilename;
    let updatedPost;
    const postId = req.params.id;

    // ObjectId'nin geçerli olup olmadığını kontrol edin
    /*if (!mongoose.Types.ObjectId.isValid(postId)) {
      return next(new HttpError("Invalid post ID.", 400));
    }*/
    let {
      title,
      city,
      type,
      breed,
      gender,
      age,
      phoneNumber,
      sterilize,
      description,
    } = req.body;

    if (
      !title ||
      !type ||
      !city ||
      !breed ||
      !gender ||
      !age ||
      !phoneNumber ||
      !sterilize ||
      !description
    ) {
      return next(new HttpError("Fill in all fields", 422));
    }
    // eski postu database den al
    const oldPost = await Post.findById(postId);
    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        //resim seçildimi
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            city,
            type,
            breed,
            gender,
            age,
            phoneNumber,
            sterilize,
            description,
          },
          { new: true }
        );
      } else {
        // veritabanından eski fotoyu sil
        fs.unlink(
          path.join(__dirname, "..", "uploads", oldPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        //yeni foto yükleme
        const { thumbnail } = req.files;
        //dosya boyut kontrol
        if (thumbnail.size > 2000000) {
          return next(
            new HttpError("Thumbnail too big. Shold be less than 2mb.")
          );
        }
        fileName = thumbnail.name;
        let splittedFilename = fileName.split(".");
        newFilename =
          splittedFilename[0] +
          uuid() +
          "." +
          splittedFilename[splittedFilename.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFilename),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            city,
            type,
            breed,
            gender,
            age,
            phoneNumber,
            sterilize,
            description,
            thumbnail: newFilename,
          },
          { new: true }
        );
      }
    }
    if (!updatedPost) {
      return next(HttpError("Couldn't update post.", 400));
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* Delete A POST **********
// delete: api/posts/:id
// Protected
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable.", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;
    if (req.user.id == post.creator) {
      //silen postun kullanıcısı
      //thumbnail i uploads klasöründen silme
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError());
          } else {
            await Post.findByIdAndDelete(post);
            // kullanıcı bulup gönderi sayısını azaltmak
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          }
        }
      );
    } else {
      return next(new HttpError("Post couldn't be deleted.", 403));
    }
    res.json(`Post ${postId} deleted successfully`);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ******************* SEARCH POSTS **********
// get: api/posts/search
// UnProtected
const searchPosts = async (req, res, next) => {
  try {
    const { type, age, city, breed, gender, sterilize } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }

    if (age) {
      query.age = { $eq: age }; // Yaşı tam eşleşen sonuçları getirir
    }

    if (city) {
      query.city = city;
    }

    if (breed) {
      query.breed = breed;
    }

    if (gender) {
      query.gender = gender;
    }

    if (sterilize) {
      query.sterilize = sterilize;
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
  searchPosts,
};
