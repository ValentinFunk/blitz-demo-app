import { SessionContext } from "blitz"
import db, { FindManyProjectArgs } from "db"

type GetProjectsInput = {
  where?: FindManyProjectArgs["where"]
  orderBy?: FindManyProjectArgs["orderBy"]
  skip?: FindManyProjectArgs["skip"]
  take?: FindManyProjectArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyProjectArgs['include']
}

export default async function getProjects(
  { where, orderBy, skip = 0, take }: GetProjectsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const projects = await db.project.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.project.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    projects,
    nextPage,
    hasMore,
  }
}
