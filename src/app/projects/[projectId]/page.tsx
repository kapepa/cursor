import { ProjectIdView } from "@/features/projects/components/project-id-view";
import { NextPage } from "next";
import { Id } from "../../../../convex/_generated/dataModel";

interface ProjectIdPageProps {
  params: Promise<{ projectId: Id<"projects"> }>
}

const ProjectIdPage: NextPage<ProjectIdPageProps> = async ({ params }) => {
  const { projectId } = await params;

  return (
    <ProjectIdView
      projectId={projectId}
    />
  )
}

export default ProjectIdPage;