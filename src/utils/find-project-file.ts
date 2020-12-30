import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { findFileByExtensionRecursively } from "./find-file-by-extension-recursively";
import { isProjectFile } from "./is-project-file";

export const findProjectFile = (file: string) => {
  if (isProjectFile(file)) {
    return file;
  }

  const fileDir = path.dirname(file);

  const csprojFile = findFileByExtensionRecursively(fileDir, "csproj");
  if (csprojFile) {
    return csprojFile;
  }

  const fsprojFile = findFileByExtensionRecursively(fileDir, "fsproj");
  if (fsprojFile) return fsprojFile;

  const slnFile = findFileByExtensionRecursively(fileDir, "sln");

  return slnFile;
};
