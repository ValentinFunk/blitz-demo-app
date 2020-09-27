import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneProjectArgs } from "db"

type GetProjectInput = {
  where: FindOneProjectArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneProjectArgs['include']
}

export default async function getProject(
  { where /* include */ }: GetProjectInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const project = await db.project.findOne({ where })

  if (!project) throw new NotFoundError()

  return project
}
