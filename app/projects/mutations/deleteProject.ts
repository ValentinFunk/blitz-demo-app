import { SessionContext } from "blitz"
import db, { ProjectDeleteArgs } from "db"

type DeleteProjectInput = {
  where: ProjectDeleteArgs["where"]
}

export default async function deleteProject(
  { where }: DeleteProjectInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const project = await db.project.delete({ where })

  return project
}
