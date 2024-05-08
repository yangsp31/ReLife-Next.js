import path from "path";
import { fileURLToPath } from "url";

// `__dirname`을 대체하기 위한 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": path.resolve(__dirname, "src/app/components"),
    };
    return config;
  },
};

export default nextConfig;