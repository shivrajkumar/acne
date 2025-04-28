import { chain } from "./middleware/chain";
import { utmMiddleware } from "./middleware/utmMiddleware";

export default chain([utmMiddleware]);
