/* eslint-disable import/no-import-module-exports */
import { GluegunCommand } from "gluegun";
import { capitalizeFirstLetter } from "../utils";

const createEntity: GluegunCommand = {
  name: "entity",
  description: "Cria uma nova entidade.",
  alias: ["e"],
  async run({
    parameters,
    template,
    print,
  }) {
    if (!parameters.first) {
      print.error("O nome da entidade é obrigatória!");
      return;
    }

    const name = capitalizeFirstLetter(parameters.first);
    const spinner = print.spin({ text: "Gerando..." });
    if (parameters.options.path) {
      const { path } = parameters.options;
      spinner.start();
      await template.generate({
        template: "entity.ts.ejs",
        target: `${path}/${name}.ts`,
        props: { name },
      });

      print.success(`Arquivo ${path}/${name}.ts criado.`);
      spinner.stop();
    } else {
      spinner.start();
      await template.generate({
        template: "entity.ts.ejs",
        target: `${name}.ts`,
        props: { name },
      });
      spinner.stop();
      print.success(`Arquivo ${name}.ts criado.`);
    }
  },
};

module.exports = createEntity;
