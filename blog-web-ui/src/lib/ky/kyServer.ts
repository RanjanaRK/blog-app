import ky from "ky";
import env from "../env";

// const token = (await cookies()).get("directus_session_token")?.value as string;

const kyServer = ky.create({
  prefixUrl: env.API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
});

export default kyServer;
