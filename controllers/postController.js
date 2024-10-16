import prisma from "../utils/database.js";
import postSchema from "../schema/postSchema.js";

const createPost = async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    const { title, content, published } = req.body;
    const userId = req.user.id;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export { createPost };
