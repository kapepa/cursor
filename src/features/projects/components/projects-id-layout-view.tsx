import { FC } from "react";
import { Navbar } from "./navbar";
import { Id } from "../../../../convex/_generated/dataModel";

interface ProjectsIdLayoutViewProps {
  projectId: Id<"projects">;
  children: React.ReactNode;
}

const ProjectsIdLayoutView: FC<ProjectsIdLayoutViewProps> = (props) => {
  const { projectId, children } = props;

  return (
    <div
      className="w-full h-screen flex flex-col"
    >
      <Navbar
        projectId={projectId}
      />
      {children}
    </div>
  )
}

export { ProjectsIdLayoutView }