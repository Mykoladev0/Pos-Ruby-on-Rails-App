import { PrismaClient, Store, Settings } from "@prisma/client";

export class StoreService {
  private prisma = new PrismaClient();

  public async getStore(storeId: number): Promise<Store> {
    return await this.prisma.store.findOne({
      where: {
        id: storeId,
      },
    });
  }

  // storeId is the auto-increment ID from the DB, not the BC store ID.
  public async updateStore(
    storeId: number,
    accessToken: string,
    now: Date
  ): Promise<Store> {
    return await this.prisma.store.update({
      where: { id: storeId },
      data: {
        updatedAt: now.toISOString(),
        accessToken,
      },
    });
  }

  public async createStore(
    storeHash: string,
    accessToken: string,
    now: Date
  ): Promise<Store> {
    return await this.prisma.store.create({
      data: {
        hash: storeHash,
        createdAt: now.toISOString(),
        accessToken,
      },
    });
  }

  public async upsertStore(
    storeHash: string,
    accessToken: string,
    now: Date
  ): Promise<Store> {
    const existingStore = await this.prisma.store.findOne({
      where: {
        hash: storeHash,
      },
    });

    if (existingStore) {
      return await this.updateStore(existingStore.id, accessToken, now);
    } else {
      return await this.createStore(storeHash, accessToken, now);
    }
  }

  public async getSettings(storeId: number): Promise<Settings | null> {
    try {
      return await this.prisma.settings.findOne({
        where: {
          storeId,
        },
      });
    } catch (error) {
      return null;
    }
  }

  public async upsertSettings(data: Settings): Promise<Settings> {
    const existingSettings = await this.getSettings(data.storeId);

    if (existingSettings) {
      return await this.prisma.settings.update({
        where: { storeId: data.storeId },
        data,
      });
    } else {
      return await this.prisma.settings.create({
        data,
      });
    }
  }
}
