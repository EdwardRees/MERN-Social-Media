import express from "express";
const eventsRouter = express.Router();

/**
 * @route GET api/chat
 * @desc base route
 * @access Public
 */
eventsRouter.get("/", (req: any, res: any) => {
  res.send("Events Router");
});


export { eventsRouter };
