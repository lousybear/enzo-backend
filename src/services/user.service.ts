import User, { IUser } from "./models/IUser";

export const userService = {
  async getUser(id?: string): Promise<IUser[] | null> {
    if (id) {
      return User.findById(id);
    }
    const users = await User.find();
    return users;
  },

  async createUser(userInput: any): Promise<IUser> {
    const user = new User(userInput);
    return await user.save();
  },
};
