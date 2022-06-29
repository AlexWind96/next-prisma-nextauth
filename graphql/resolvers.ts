export const resolvers = {
  Query: {
    links: (_parent, _args, ctx) => {
      console.log(_args, _args, ctx)
      return ctx.prisma.link.findMany()
    },
  },
}
