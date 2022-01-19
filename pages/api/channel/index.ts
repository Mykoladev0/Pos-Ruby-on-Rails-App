import { NextApiRequest, NextApiResponse } from "next";
import { ChannelService } from "../../../services/channel.service";
import { StoreService } from "../../../services/store.service";
import BigCommerceClient from "../../../services/bigcommerce.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { storeId, channelName } = req.body;

    const Store = new StoreService();
    const { accessToken, hash } = await Store.getStore(storeId);

    BigCommerceClient.config.accessToken = accessToken;
    BigCommerceClient.config.storeHash = hash;

    const Channel = new ChannelService(BigCommerceClient);
    // Check if store already has channel
    const channelFound = await Channel.channelExists(
      parseInt(process.env.BC_APP_ID)
    );

    // If store already has channel, connect the app to it and update channel name if needed
    if (channelFound) {
      await Channel.updateChannel(parseInt(channelFound.id), {
        status: "connected",
        name: channelName,
      });
    } else {
      // Create new channel
      await Channel.registerChannel(parseInt(process.env.BC_APP_ID));
    }

    res.json({ success: true });
  } catch (err) {
    res.status(422).json({ error: err });
  }
};

export default handler;
