import { User } from "../types";
import { UserModel } from "../models";

export class UserService {
  constructor(private userModel: typeof UserModel) {}
  createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }
  getUser(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
  updateUser(id: string, user: User): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }
  deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
