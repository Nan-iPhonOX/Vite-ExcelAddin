import { generateCustomFunctionsMetadata } from "custom-functions-metadata";
import { Plugin ,loadEnv } from "vite";
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

// export default function officeManifest(options) {
//     const manifestFile = options?.path ?? 'manifest.xml';
//     let viteConfig;
//     let env;
//     return {
//         name: 'office-addin:manifest',
//         configResolved(resolvedConfig) {
//             viteConfig = resolvedConfig;
//             env = loadEnv(viteConfig.mode, process.cwd(), 'ADDIN');
//         },
//         generateBundle() {
//             const manifestPath = path.resolve(viteConfig.root, manifestFile);
//             if (!fs.existsSync(manifestPath)) {
//                 viteConfig.logger.warn(`The manifest.xml file does not exist at path: '${manifestPath}'`);
//                 return;
//             }
//             const devUrl = options?.devUrl || env['ADDIN_DEV_URL'];
//             const prodUrl = options?.prodUrl || env['ADDIN_PROD_URL'];
//             let content = fs.readFileSync(manifestPath, 'utf-8');
//             if (devUrl && devUrl != '') {
//                 content = content.replace(new RegExp(devUrl, "g"), prodUrl);
//             }
//             this.emitFile({
//                 type: 'asset',
//                 fileName: path.basename(manifestPath),
//                 source: content
//             });
//         },
//     };
// }
