import { StoreService } from "../services/store.service";

export default function withStoreServerSide(
  getServerSidePropsFunc?: Function
): Function {
  return async (context) => {
    try {
      const data = await new StoreService().getSettings(
        parseInt(context.query.storeId)
      );

      // Extract settings data from response
      const settings = {
        location: data.location,
        importData: data.importData,
        includeDesc: data.includeDesc,
        includeImg: data.includeImg,
        keepLevels: data.keepLevels,
      };

      if (getServerSidePropsFunc) {
        const data = await getServerSidePropsFunc();
        return {
          props: {
            ...context.query,
            ...data,
            settings,
          },
        };
      }
      return {
        props: {
          ...context.query,
          settings,
        },
      };
    } catch (error) {
      return { props: { ...context.query } };
    }
  };
}
