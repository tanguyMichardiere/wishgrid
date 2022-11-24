const { clientEnv, ClientEnv, handleErrors } = require("./schema");

const env = ClientEnv.safeParse(clientEnv);

handleErrors(env);

// validate that client-side environment variables are exposed to the client
const invalidNames = Object.keys(env.data).filter((key) => !key.startsWith("NEXT_PUBLIC_"));
if (invalidNames.length > 0) {
  throw new Error(`Invalid client-side environment variable name\n${invalidNames.join("\n")}`);
}

module.exports = {
  ...env.data,
  default: env.data,
};
