import { server } from "@/server/index.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
