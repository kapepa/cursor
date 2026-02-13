import { FC, Fragment } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { useFilePath } from "@/features/projects/hooks/use-files";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FileIcon } from "@react-symbols/icons/utils";

interface FileBreadcrumbsProps {
  projectId: Id<"projects">
}

const FileBreadcrumbs: FC<FileBreadcrumbsProps> = (props) => {
  const { projectId } = props;
  const { activeTabId } = useEditor(projectId);
  const filePath = useFilePath(activeTabId);

  if (filePath === undefined || !activeTabId) {
    return (
      <div
        className="p-2 bg-background pl-4 border-b"
      >
        <Breadcrumb>
          <BreadcrumbLink
            className="sm:gap-0.5 gap-0.5"
          >
            <BreadcrumbItem
              className="text-sm"
            >
              <BreadcrumbPage>
                &nbsp;
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbLink>
        </Breadcrumb>
      </div>
    )
  }

  return (
    <div
      className="p-2 bg-background pl-4 border-b"
    >
      <Breadcrumb>
        <BreadcrumbLink
          className="flex sm:gap-1 gap-1"
        >
          {
            filePath.map((item, index) => {
              const isLast = index === filePath.length - 1;
              return (
                <Fragment
                  key={item._id}
                >
                  <BreadcrumbItem
                    className="text-sm"
                  >
                    {
                      isLast
                        ? (
                          <BreadcrumbPage
                            className="flex items-center gap-1"
                          >
                            <FileIcon
                              fileName={item.name}
                              autoAssign
                              className="size-4"
                            />
                            {item.name}
                          </BreadcrumbPage>
                        )
                        : (
                          <BreadcrumbLink
                            href="#"
                          >
                            {item.name}
                          </BreadcrumbLink>
                        )
                    }
                  </BreadcrumbItem>
                  {
                    !isLast && <BreadcrumbSeparator className="flex items-center" />
                  }
                </Fragment>
              )
            })
          }
        </BreadcrumbLink>
      </Breadcrumb>
    </div>
  )
}

export { FileBreadcrumbs }