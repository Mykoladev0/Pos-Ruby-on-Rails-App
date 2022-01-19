import { NextApiRequest, NextApiResponse } from "next";
import { StoreService } from "../../../services/store.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getSettings(req, res);
    case "PUT":
      return await updateSettings(req, res);
    default:
      res.status(404).json({ error: "Route not implemented" });
      return;
  }
};

const getSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { storeId },
    } = req;

    // Query can also contains array
    const id = Array.isArray(storeId) ? storeId[0] : storeId;

    const settings = await new StoreService().getSettings(parseInt(id));

    res.json(settings);
  } catch (err) {
    res.status(422).json({ error: err });
  }
};

const updateSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { storeId },
    } = req;

    // Query can also contains array
    const id = Array.isArray(storeId) ? storeId[0] : storeId;
    const { settings } = req.body;
    settings.storeId = parseInt(id);

    const updatedSettings = await new StoreService().upsertSettings(settings);

    res.json(updatedSettings);
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

export default handler;
