import { USER } from "../users.types";
export { }

declare global {
    namespace Express {
        export interface Request {
            user?: USER;
        }
    }
}