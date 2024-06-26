import { generateCustomFunctionsMetadata } from "custom-functions-metadata";
import { Plugin } from "vite";
import fs from "fs";
import path from "path";

async function outJsonFile(source: string[]) {
  let jsFuncs: string[] = [];
  await generateCustomFunctionsMetadata(source, true).then(
    ({ associate, metadataJson }) => {
      jsFuncs = associate.map((func) => {
        return `\nCustomFunctions.associate("${func.id}", ${func.functionName})`;
      });
      const jsonContent = metadataJson.toString();
      fs.writeFile("./public/functions.json", jsonContent, (err) =>
        err ? console.log(err) : null
      );
    }
  );
  return jsFuncs;
}

export function excelAddin(): Plugin {
  return {
    name: "rollup-plugin-excelAddin",
    enforce: "pre",
    async transform(code, id) {
      code
      if (id.endsWith("/functions/functions.ts")) {
        const dir = path.dirname(id);
        const files = fs.readdirSync(dir).map((f) => path.resolve(dir, f));
        let sourceCode = files
          .map((f) => fs.readFileSync(f, "utf8"))
          .join("\n");
        const jsFuncs = await outJsonFile(files);
        return sourceCode + jsFuncs.join();
      }
    },
  };
}
