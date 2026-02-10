import { cn } from "@/lib/utils";
import { FC } from "react";
import { getItemPadding } from "./constants";
import { Spinner } from "@/components/ui/spinner";

interface LoadingRowProps {
  level: number;
  className?: string,
}

const LoadingRow: FC<LoadingRowProps> = (props) => {
  const { level, className } = props;

  return (
    <div
      className={cn(
        "h-5.5 flex items-center text-muted-foreground",
        className,
      )}
      style={{ paddingLeft: getItemPadding(level, true) }}
    >
      <Spinner
        className="size-4 text-ring ml-0.5"
      />
    </div>
  )
}

export { LoadingRow }