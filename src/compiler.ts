import { generateCustomFunctionsMetadata } from "custom-functions-metadata";
import { type RollupOptions, rollup } from "rollup";
import rts from "rollup-plugin-typescript2";
import { Plugin } from "vite";
import fs from "fs";
import path from "path";
import ts from "typescript";

async function outJsonFile(source: string) {
  let jsFuncs: string[] = [];
  await generateCustomFunctionsMetadata(source, true).then(
    ({ associate, metadataJson }) => {
      jsFuncs = associate.map((func) => {
        return `\nCustomFunctions.associate("${func.id}", ${func.functionName})`;
      });
      const jsonContent = metadataJson.toString();
      fs.writeFile("./public/functions.json", jsonContent, (err) => err?console.log(err):null );
    }
  );
  return jsFuncs;
}

export default function excelAddin(): Plugin {
  return {
    name: "rollup-plugin-excelAddin",
    async transform(code, id) {
      if (id.endsWith("functions.ts")||id.endsWith("commands.ts")) {
        const jsFuncs = await outJsonFile(id);
        return code + jsFuncs.join();
      }
    },
  };
}
