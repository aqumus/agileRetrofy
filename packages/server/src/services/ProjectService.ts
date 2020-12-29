import { Project } from "../types";
import { ProjectModel } from "../models";

export class ProjectService {
  constructor(private projectModel: typeof ProjectModel) {}
  createProject(project: Project): Promise<Project> {
    return this.projectModel.create(project);
  }
  getProject(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }
  updateProject(id: string, project: Project): Promise<Project | null> {
    return this.projectModel
      .findByIdAndUpdate(id, project, { new: true })
      .exec();
  }
  deleteProject(id: string): Promise<Project | null> {
    return this.projectModel.findByIdAndRemove(id).exec();
  }
}
