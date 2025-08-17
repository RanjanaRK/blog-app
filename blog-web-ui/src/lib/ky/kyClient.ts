import ky from "ky";
import env from "../env";

const kyClient = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  mode: "cors",
  cache: "no-store",
  retry: 2,
});

export default kyClient;
