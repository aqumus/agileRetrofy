import { Note } from "../types";
import { NoteModel } from "../models";

export class NoteService {
  constructor(private noteModel: typeof NoteModel) {}
  createNote(note: Note): Promise<Note> {
    return this.noteModel.create(note);
  }
  getNote(id: string): Promise<Note | null> {
    return this.noteModel.findById(id).exec();
  }
  getNotes(boardId: string): Promise<Note[]> {
    return this.noteModel.find({ boardId }).exec();
  }
  updateNote(id: string, note: Note): Promise<Note | null> {
    return this.noteModel.findByIdAndUpdate(id, note, { new: true }).exec();
  }
  deleteNote(id: string): Promise<Note | null> {
    return this.noteModel.findByIdAndRemove(id).exec();
  }
}
