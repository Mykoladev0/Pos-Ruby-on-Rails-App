import { NextApiRequest, NextApiResponse } from "next";
import { Store } from "@prisma/client";
import { StoreService } from "../../services/store.service";
import { UserService } from "../../services/user.service";
import BigCommerceClient from "../../services/bigcommerce.service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await BigCommerceClient.authorize(req.query)
    .then(async (authCallbackData: any) => {
      const now = new Date();
      const accessToken: string = authCallbackData.access_token;
      const storeHash: string = authCallbackData.context.split("/")[1];

      // Create or update the stores
      const storeService = new StoreService();
      const store: Store = await storeService.upsertStore(
        storeHash,
        accessToken,
        now
      );

      // Create or update user
      const userService = new UserService();
      await userService.upsertUser(
        store.id,
        authCallbackData.context,
        authCallbackData.user,
        now
      );

      res.writeHead(302, {
        Location: `/?storeId=${store.id}`,
      });
      res.end();
    })
    .catch((err: any) => res.json({ error: err }));
};

export default handler;
