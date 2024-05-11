import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/components": path.resolve(__dirname, "src/app/components"),
      "@/styles": path.resolve(__dirname, "src/app/styles"), // 예시로 스타일 경로 추가
    };
    return config;
  },
};

export default nextConfig;
