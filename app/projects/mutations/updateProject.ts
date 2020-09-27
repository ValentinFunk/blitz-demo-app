import { SessionContext } from "blitz"
import db, { ProjectUpdateArgs } from "db"

type UpdateProjectInput = {
  where: ProjectUpdateArgs["where"]
  data: ProjectUpdateArgs["data"]
}

export default async function updateProject(
  { where, data }: UpdateProjectInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const project = await db.project.update({ where, data })

  return project
}
