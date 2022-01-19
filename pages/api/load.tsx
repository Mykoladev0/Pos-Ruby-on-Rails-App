import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ChannelService } from "../../services/channel.service";
import BigCommerceClient from "../../services/bigcommerce.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { store_hash } = BigCommerceClient.verify(
      req.query["signed_payload"]
    );

    // Get store access token based on hash
    const { id, accessToken } = await new PrismaClient().store.findOne({
      where: {
        hash: store_hash,
      },
    });

    // Update BigCommerceClient with store hash and access token
    BigCommerceClient.config.accessToken = accessToken;
    BigCommerceClient.config.storeHash = store_hash;

    // Check if store already has channel connected
    const channelFound = await new ChannelService(
      BigCommerceClient
    ).channelConnected(parseInt(process.env.BC_APP_ID));

    // If store already has channel skip creation of channel
    if (channelFound) {
      // Handle if there is no "section" provided
      const slug = req.query["section"] ?? "overview";
      res.writeHead(302, { Location: `/${slug}?storeId=${id}` });
      return res.end();
    }

    // If not, go to onboarding page
    res.writeHead(302, {
      Location: `/?storeId=${id}`,
    });
    return res.end();
  } catch (err) {
    res.json({ error: err });
  }
};

export default handler;
