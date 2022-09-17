// eslint-disable-next-line import/no-import-module-exports
import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "generate",
  alias: ["g"],
  run: async ({
    parameters,
    createComponent,
  }: GluegunToolbox) => {
    await createComponent(parameters.first, parameters.second, parameters.options.path);
  },
};
