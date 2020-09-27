import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createProject from "app/projects/mutations/createProject"
import ProjectForm from "app/projects/components/ProjectForm"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Project</title>
      </Head>

      <main>
        <h1>Create New Project</h1>

        <ProjectForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const project = await createProject({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(project))
              router.push("/projects/[projectId]", `/projects/${project.id}`)
            } catch (error) {
              alert("Error creating project " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewProjectPage.getLayout = (page) => <Layout title={"Create New Project"}>{page}</Layout>

export default NewProjectPage
