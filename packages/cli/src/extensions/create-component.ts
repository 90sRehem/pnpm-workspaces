/* eslint-disable import/no-import-module-exports */
import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { capitalizeFirstLetter } from "../utils";

module.exports = (toolbox: Toolbox) => {
  const { print, template } = toolbox;
  async function createComponent(model: string, name: string, folder?: string) {
    if (!name) {
      print.error("O nome do componente é obrigatório!");
    }

    const fileName = capitalizeFirstLetter(name);
    const spinner = print.spin({ text: "Gerando..." });
    if (folder) {
      spinner.start();
      await toolbox.system.run("sleep 5");
      await template.generate({
        template: `${model}.ts.ejs`,
        target: `${folder}/${fileName}.ts`,
        props: { name: fileName },
      });

      print.success(`Arquivo ${folder}/${fileName}.ts criado.`);
      spinner.stop();
    } else {
      spinner.start();
      await template.generate({
        template: `${model}.ts.ejs`,
        target: `${fileName}.ts`,
        props: { name: fileName },
      });
      spinner.stop();
      print.success(`Arquivo ${fileName}.ts criado.`);
    }
  }
  // eslint-disable-next-line no-param-reassign
  toolbox.createComponent = createComponent;
};
