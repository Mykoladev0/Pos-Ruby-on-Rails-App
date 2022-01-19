import BigCommerce from "node-bigcommerce";

interface ChannelData {
  name?: string;
  status?: "connected" | "disconnected";
  id?: string;
}

export class ChannelService {
  private BigCommerceClient: BigCommerce;

  constructor(client: BigCommerce) {
    this.BigCommerceClient = client;
  }

  public async channelExists(appId: number): Promise<ChannelData | null> {
    return await this.BigCommerceClient.get("/channels")
      .then((response) =>
        response.data.find((channel) => channel.config_meta?.app?.id == appId)
      )
      .catch((err) => {
        const statusCode: number = err.code || 500;
        console.log("code", statusCode);
        console.log("responseBody", err);
        return null;
      });
  }

  public async channelConnected(appId: number): Promise<ChannelData | null> {
    return await this.BigCommerceClient.get("/channels")
      .then((response) =>
        response.data.find(
          (channel) =>
            channel.status === "connected" &&
            channel.config_meta?.app?.id == appId
        )
      )
      .catch((err) => {
        const statusCode: number = err.code || 500;
        console.log("code", statusCode);
        console.log("responseBody", err);
        return null;
      });
  }

  private newChannelRequest(appId: number) {
    const channelsRequest = {
      name: "Sample",
      platform: "custom",
      type: "pos",
      external_id: "",
      is_listable_from_ui: false,
      is_visible: true,
      status: "connected",
      config_meta: {
        app: {
          id: appId,
          sections: [
            {
              title: "Overview",
              query_path: "overview",
            },
            {
              title: "Catalog",
              query_path: "catalog",
            },
            {
              title: "Settings",
              query_path: "settings",
            },
          ],
        },
      },
    };
    return channelsRequest;
  }

  public async updateChannel(channelId: number, data: ChannelData) {
    try {
      return await this.BigCommerceClient.put(`/channels/${channelId}`, data);
    } catch (error) {
      console.log("Error updating channel", error);
    }
  }

  public async registerChannel(appId: number) {
    if (await this.channelExists(appId)) {
      return;
    }
    await this.BigCommerceClient.post(
      "/channels",
      this.newChannelRequest(appId)
    )
      .then((response) => {
        console.log("channels POST response:", response);
      })
      .catch((err) => {
        const statusCode: number = err.code || 500;
        console.log("code", statusCode);
        console.log("responseBody", err.responseBody);
      });
  }
}
