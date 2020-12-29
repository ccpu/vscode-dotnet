import { Utility } from "./utility";

class Config {
  public static get unitTestTemplateName(): string {
    return Utility.getConfiguration().get<string>("unitTestTemplateName");
  }
}

export { Config };
