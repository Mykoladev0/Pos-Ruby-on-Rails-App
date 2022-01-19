import { NextApiRequest, NextApiResponse } from "next";
import { ChannelService } from "../../../services/channel.service";
import { StoreService } from "../../../services/store.service";
import BigCommerceClient from "../../../services/bigcommerce.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "DELETE":
      return await removeChannel(req, res);
    default:
      res.status(404).json({ error: "Route not implemented" });
      return;
  }
};

const removeChannel = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { storeId },
    } = req;

    // Query can also contains array
    const id = Array.isArray(storeId) ? storeId[0] : storeId;

    const Store = new StoreService();
    const { accessToken, hash } = await Store.getStore(parseInt(id));

    BigCommerceClient.config.accessToken = accessToken;
    BigCommerceClient.config.storeHash = hash;

    const Channel = new ChannelService(BigCommerceClient);
    // Check if store already has channel
    const channelFound = await Channel.channelExists(
      parseInt(process.env.BC_APP_ID)
    );

    // If store has channel, discconnect it
    if (channelFound) {
      await Channel.updateChannel(parseInt(channelFound.id), {
        status: "disconnected",
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(422).json({ error: err });
  }
};

export default handler;
