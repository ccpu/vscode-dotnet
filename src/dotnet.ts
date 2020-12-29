"use strict";
import * as path from "path";
import * as vscode from "vscode";
import { Executor } from "./executor";
import { Config } from "./config";

export class Dotnet {
  public static build(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      Executor.runInTerminal(`dotnet build "${fileUri.fsPath}"`);
    }
  }

  public static run(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      Executor.runInTerminal(`dotnet run --project "${fileUri.fsPath}"`);
    }
  }

  public static test(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      Executor.runInTerminal(`dotnet test "${fileUri.fsPath}"`);
    }
  }

  public static clean(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      Executor.runInTerminal(`dotnet clean "${fileUri.fsPath}"`);
    }
  }

  public static createTest(fileUri: vscode.Uri) {
    if (fileUri && fileUri.fsPath) {
      const ext = path.extname(fileUri.fsPath);
      const name = path.basename(fileUri.fsPath, ext) + ".UnitTests";
      const projectFileName = name + ext;

      const pathAbsolute = path.resolve(
        path.dirname(fileUri.fsPath),
        "..",
        name
      );

      const projectFilePath = path.join(pathAbsolute, projectFileName);

      Executor.runInTerminal(
        `dotnet new ${Config.unitTestTemplateName} -n ${name} -o '${pathAbsolute}'`
      );

      Executor.runInTerminal(
        `dotnet add '${projectFilePath}' reference '${fileUri.fsPath}'`
      );
      Executor.runInTerminal(`dotnet build '${projectFilePath}'`);
    }
  }
}
