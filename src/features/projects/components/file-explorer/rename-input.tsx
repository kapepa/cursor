import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils"
import { FC, useState } from "react";
import { getItemPadding } from "./constants";
import { cn } from "@/lib/utils";

interface RenameInputProps {
  type: "file" | "folder",
  level: number,
  isOpen?: boolean,
  defaultValue: string,
  onSubmit: (name: string) => void,
  onCancel: () => void,
}

const RenameInput: FC<RenameInputProps> = (props) => {
  const { type, level, isOpen, defaultValue, onCancel, onSubmit } = props;
  const [value, setValue] = useState<string>(defaultValue);

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    onSubmit(trimmedValue);
  }

  return (
    <div
      className="w-full flex items-center gap-1 h-5.5 bg-accent/30"
      style={{ paddingLeft: getItemPadding(level, type === "file") }}
    >
      <div
        className="flex items-center gap-0.5"
      >
        {type === "folder" && (
          <ChevronRightIcon
            className={cn(
              "size-4 shrink-0 text-muted-foreground",
              isOpen && "rotate-90"
            )}
          />
        )}
        {type === "file" && (
          <FileIcon
            fileName={value}
            className="size-4"
            autoAssign
          />
        )}
        {type === "folder" && (
          <FolderIcon
            folderName={value}
            className="size-4"
          />
        )}
      </div>
      <input
        type="text"
        value={value}
        autoFocus
        onBlur={handleSubmit}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onCancel();
        }}
        onFocus={(e) => {
          if (type === "folder") {
            e.currentTarget.select();
          } else {
            const value = e.currentTarget.value;
            const lastDotIndex = value.lastIndexOf(".");

            if (lastDotIndex > 0) {
              e.currentTarget.setSelectionRange(0, lastDotIndex);
            } else {
              e.currentTarget.select();
            }
          }
        }}
        className="flex-1 bg-transparent text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-ring"
      />
    </div>
  )
}

export { RenameInput }