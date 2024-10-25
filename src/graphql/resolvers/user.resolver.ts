import { GraphQLResolveInfo } from "graphql";
import { userService } from "../../services/index";

export const userResolver = {
  Query: {
    async users(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await userService.getUser();
    },
    async user(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await userService.getUser(args.id);
    },
  },
  Mutation: {
    async createUser(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await userService.createUser(args.userInput);
    },
  },
};
