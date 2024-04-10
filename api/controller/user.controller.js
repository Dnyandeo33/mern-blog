import User from "../models/user.model.js";

const userController = {
    getUser: async (req, res) => {
        const users = await User.find({});
        res.status(200).json({ users })
    }
}
export default userController;