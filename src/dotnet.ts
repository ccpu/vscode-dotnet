"use strict";
import * as path from "path";
import * as vscode from "vscode";
import { Executor } from "./executor";
import { Config } from "./config";
import { findProjectFile } from "./utils";

export class Dotnet {
  public static build(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      const projFile = findProjectFile(fileUri.fsPath);
      Executor.runInTerminal(`dotnet build "${projFile}"`);
    }
  }

  public static run(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      const projFile = findProjectFile(fileUri.fsPath);
      Executor.runInTerminal(`dotnet run --project "${projFile}"`);
    }
  }

  public static test(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      const projFile = findProjectFile(fileUri.fsPath);
      Executor.runInTerminal(`dotnet test "${projFile}"`);
    }
  }

  public static clean(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      const projFile = findProjectFile(fileUri.fsPath);
      Executor.runInTerminal(`dotnet clean "${projFile}"`);
    }
  }

  public static createTest(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      const projFile = findProjectFile(fileUri.fsPath);
      const ext = path.extname(projFile);
      const name = path.basename(projFile, ext) + ".UnitTests";
      const projectFileName = name + ext;

      const pathAbsolute = path.resolve(path.dirname(projFile), "..", name);

      const projectFilePath = path.join(pathAbsolute, projectFileName);

      Executor.runInTerminal(
        `dotnet new ${Config.unitTestTemplateName} -n ${name} -o '${pathAbsolute}'`
      );

      Executor.runInTerminal(
        `dotnet add '${projectFilePath}' reference '${projFile}'`
      );
    }
  }
}
