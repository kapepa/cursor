"use client"

import { useRouter } from "next/navigation";
import { FC } from "react";
import { useProjects } from "../hooks/use-projects";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, Globe2Icon, Loader2Icon } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface ProjectsCommandDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return (
      <FaGithub
        className="size-4 text-muted-foreground"
      />
    )
  }

  if (project.importStatus === "failed") {
    return (
      <AlertCircleIcon
        className="size-4 text-muted-foreground"
      />
    )
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon
        className="size-4 text-muted-foreground animate-ping"
      />
    )
  }

  return (
    <Globe2Icon
      className="size-4 text-muted-foreground animate-spin"
    />
  )
}

const ProjectsCommandDialog: FC<ProjectsCommandDialogProps> = (props) => {
  const { open, onOpenChange } = props;
  const router = useRouter();
  const projects = useProjects();

  const handleSelect = (projectId: Id<"projects">) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Project"
      description="Search and navigate to your projects."
    >
      <CommandInput
        placeholder="Search project..."
      />
      <CommandList>
        <CommandEmpty>
          No project found.
        </CommandEmpty>
        <CommandGroup
          heading="Projects"
        >
          {
            projects?.map((project) => (
              <CommandItem
                key={project._id}
                value={`${project.name}-${project._id}`}
                onSelect={() => handleSelect(project._id)}
              >
                {getProjectIcon(project)}
                <span>
                  {project.name}
                </span>
              </CommandItem>
            ))
          }
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export { ProjectsCommandDialog }