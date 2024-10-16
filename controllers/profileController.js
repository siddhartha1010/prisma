import prisma from "../utils/database.js";
import profileSchema from "../schema/profileSchema.js";

const createProfile = async (req, res) => {
  try {
    const { error } = profileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    const { bio } = req.body;
    // console.log(bio);
    const userId = req.user.id;
    // console.log(userId);

    let profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (profile) {
      profile = await prisma.profile.update({
        where: { userId },
        data: {
          bio,
        },
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          bio,
          userId,
          // console.log(userId);
        },
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        profile,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export { createProfile };
