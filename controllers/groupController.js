import groupSchema from "../schema/groupSchema.js";
import prisma from "../utils/database.js";

const createGroup = async (req, res) => {
  try {
    const { error } = groupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const userId = req.user.id;
    const { gname } = req.body;

    const group = await prisma.group.create({
      data: {
        gname,
        users: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        group,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export { createGroup };
