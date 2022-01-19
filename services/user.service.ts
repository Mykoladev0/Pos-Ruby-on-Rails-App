import { PrismaClient, User } from "@prisma/client";

export class UserService {
  private prisma = new PrismaClient();

  public async getUser(user: any): Promise<User> {
    return await this.prisma.user.findOne({
      where: {
        userData: JSON.stringify(user),
      },
    });
  }

  public async updateUser(userId: number, now: Date): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        updatedAt: now.toISOString(),
      },
    });
  }

  public async createUser(
    storeId: number,
    context: any,
    user: any,
    now: Date
  ): Promise<User> {
    return await this.prisma.user.create({
      data: {
        storeId: storeId,
        context: context,
        userData: JSON.stringify(user),
        createdAt: now.toISOString(),
      },
    });
  }

  public async upsertUser(
    storeId: number,
    context: any,
    user: any,
    now: Date
  ): Promise<User> {
    const existingUser = await this.getUser(user);
    if (existingUser) {
      return await this.updateUser(existingUser.id, now);
    } else {
      return await this.createUser(storeId, context, user, now);
    }
  }
}
