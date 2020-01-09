import withDatabase from "./withDatabase";

const withMiddleware = (handler: any) => withDatabase(handler);
export default withMiddleware;
