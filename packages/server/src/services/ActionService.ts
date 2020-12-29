import { Action } from "../types";
import { ActionModel } from "../models";

export class ActionService {
  constructor(private actionModel: typeof ActionModel) {}
  createAction(action: Action): Promise<Action> {
    return this.actionModel.create(action);
  }
  getAction(id: string): Promise<Action | null> {
    return this.actionModel.findById(id).exec();
  }
  getActions(boardId: string): Promise<Action[]> {
    return this.actionModel.find({ boardId }).exec();
  }
  updateAction(id: string, action: Action): Promise<Action | null> {
    return this.actionModel.findByIdAndUpdate(id, action, { new: true }).exec();
  }
  deleteAction(id: string): Promise<Action | null> {
    return this.actionModel.findByIdAndRemove(id).exec();
  }
}
