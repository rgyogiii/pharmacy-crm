import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { pluginExposeRenderer } from "./vite.base.config.mjs";

import icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'renderer'>} */
  const forgeEnv = env;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? "";
  const dotenv = loadEnv(mode, process.cwd(), "");

  /** @type {import('vite').UserConfig} */
  return {
    root,
    mode,
    base: "./",
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      react(),
      pluginExposeRenderer(name),
      icons({
        autoInstall: true,
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          custom: FileSystemIconLoader("./resources/icons", (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        },
      }),
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    },
    define: {
      __APP_ENV__: dotenv.APP_ENV,
    },
    clearScreen: false,
  };
});
