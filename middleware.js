import { chain } from "./middleware/chain";
import { utmMiddleware } from "./middleware/utmMiddleware";

export default chain([utmMiddleware]);

export const config = {
  matcher: ["/((?!api/proxy|_next|favicon.ico).*)"],
};
