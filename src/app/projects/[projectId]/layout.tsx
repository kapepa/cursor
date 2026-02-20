"use client";

import { ProjectsIdLayoutView } from "@/features/projects/components/projects-id-layout-view";
import { Id } from "../../../../convex/_generated/dataModel";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { use } from "react";
import { ConversationSidebar } from "@/features/conversations/components/conversation-sidebar";

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIZE = 1000;

export default function ProjectIdLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ projectId: Id<"projects"> }>;
  children: React.ReactNode;
}>) {
  const { projectId } = use(params);

  return (
    <ProjectsIdLayoutView projectId={projectId}>
      <div className="flex-1 flex overflow-hidden">
        <Allotment
          className="flex-1"
          defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
        >
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            maxSize={MAX_SIDEBAR_WIDTH}
            preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
          >
            <ConversationSidebar
              projectId={projectId}
            />
          </Allotment.Pane>
          <Allotment.Pane>{children}</Allotment.Pane>
        </Allotment>
      </div>
    </ProjectsIdLayoutView>
  );
}