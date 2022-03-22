if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

require("./connectors/particle-connector");
