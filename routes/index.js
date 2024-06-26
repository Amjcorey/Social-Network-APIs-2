// Imports
const router = require("express").Router();
const apiRoutes = require("./api");

// Middleware API
router.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"));

// Exports
module.exports = router;