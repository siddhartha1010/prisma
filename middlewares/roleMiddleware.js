import rolesPermission from "../utils/roles.js";

const checkRolePermission = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming the user role is added to the request object during JWT verification
    console.log(userRole, "is the user role");
    console.log(role, "is the role");
    console.log(rolesPermission[userRole], "is the user role permissions");
    if (rolesPermission[userRole].includes(role)) {
      console.log(rolesPermission[userRole], "is the user role");
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  };
};

export { checkRolePermission };
