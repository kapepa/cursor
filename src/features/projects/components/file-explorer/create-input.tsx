import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils"
import { FC, useState } from "react";
import { getItemPadding } from "./constants";

interface CreateInputProps {
  type: "file" | "folder",
  level: number
  onSubmit: (name: string) => void,
  onCancel: () => void,
}

const CreateInput: FC<CreateInputProps> = (props) => {
  const { type, level, onCancel, onSubmit } = props;
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
    } else {
      onCancel();
    }
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
            className="size-4 shrink-0 text-muted-foreground"
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
        className="flex-1 bg-transparent text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-ring"
      />
    </div>
  )
}

export { CreateInput }