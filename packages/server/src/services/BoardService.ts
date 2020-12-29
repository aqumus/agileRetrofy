import { Board } from "../types";
import { BoardModel } from "../models";

export class BoardService {
  constructor(private boardModel: typeof BoardModel) {}
  createBoard(user: Board): Promise<Board> {
    return this.boardModel.create(user);
  }
  getBoard(id: string): Promise<Board | null> {
    return this.boardModel.findById(id).exec();
  }
  updateBoard(id: string, board: Board): Promise<Board | null> {
    return this.boardModel.findByIdAndUpdate(id, board, { new: true }).exec();
  }
  deleteBoard(id: string): Promise<Board | null> {
    return this.boardModel.findByIdAndRemove(id).exec();
  }
}
