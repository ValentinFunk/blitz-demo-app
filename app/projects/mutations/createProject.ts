import { SessionContext } from "blitz"
import db, { ProjectCreateArgs } from "db"

type CreateProjectInput = {
  data: ProjectCreateArgs["data"]
}
export default async function createProject(
  { data }: CreateProjectInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const project = await db.project.create({ data })

  return project
}
