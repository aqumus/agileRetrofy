import { Project } from "./Project";

export type User = {
  readonly firstName: string;
  readonly lastName: string;
  readonly emailId: string;
  readonly projects?: Readonly<Project>;
};
