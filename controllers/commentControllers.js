import commentSchema from "../schema/commentSchema.js";
import prisma from "../utils/database.js";
const createComment = async (req, res) => {
  try {
    const { error } = commentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    const { content } = req.body;
    const userId = req.user.id;
    const postId = req.params.id;
    console.log(postId, "is the postid");
    const commentData = await prisma.comment.create({
      data: {
        content,
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
    res.status(201).json({
      status: "success",
      data: {
        comment: commentData,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export { createComment };
