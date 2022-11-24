const { ServerEnv, handleErrors } = require("./schema");
const clientEnv = require("./client");

const serverEnv = ServerEnv.safeParse(process.env);

handleErrors(serverEnv);

// validate that server-side environment variables are not exposed to the client
const invalidNames = Object.keys(serverEnv.data).filter((key) => key.startsWith("NEXT_PUBLIC_"));
if (invalidNames.length > 0) {
  throw new Error(`Invalid server-side environment variable name\n${invalidNames.join("\n")}`);
}

module.exports = {
  ...serverEnv.data,
  ...clientEnv,
  default: { ...serverEnv.data, ...clientEnv },
};
