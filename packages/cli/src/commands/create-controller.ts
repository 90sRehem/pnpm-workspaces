/* eslint-disable import/no-import-module-exports */
import { GluegunCommand } from "gluegun";
import { capitalizeFirstLetter } from "../utils";

const createController: GluegunCommand = {
  name: "controller",
  description: "Cria um novo controller.",
  alias: ["c"],
  async run({
    parameters,
    template,
    print,
  }) {
    if (!parameters.first) {
      print.error("O nome do controller é obrigatório!");
      return;
    }

    const name = capitalizeFirstLetter(parameters.first);
    const spinner = print.spin({ text: "generating" });

    if (parameters.options.path) {
      const { path } = parameters.options;
      spinner.start();
      await template.generate({
        template: "controller.ts.ejs",
        target: `${path}/${name}.ts`,
        props: { name },
      });

      print.success(`Generated ${path}/${name}.ts`);
      spinner.stop();
    } else {
      spinner.start();

      await template.generate({
        template: "controller.ts.ejs",
        target: `${name}.ts`,
        props: { name },
      });

      spinner.stop();
      print.success(`Generated ${name}.ts`);
    }
  },
};

module.exports = createController;
