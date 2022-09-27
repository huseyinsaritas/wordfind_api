import path from "path";
import dotenv from "dotenv";

export const initDotenv = () => {
  const appDir = path.dirname(require.main?.filename || "");
  dotenv.config({ path: path.join(appDir, ".env") });
};
