import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { SignInButton } from "@clerk/nextjs";
import { ShieldAlertIcon } from "lucide-react";
import { FC } from "react";

const UnauthenticatedView: FC = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center h-screen bg-background"
    >
      <div
        className="max-w-lg bg-muted"
      >
        <Item
          variant="outline"
        >
          <ItemMedia
            variant="icon"
          >
            <ShieldAlertIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              Unauthenticated Access
            </ItemTitle>
            <ItemDescription>
              You are not uthenticated to access this resource.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <SignInButton>
              <Button
                size="sm"
                variant="outline"
              >
                Sign in
              </Button>
            </SignInButton>
          </ItemActions>
        </Item>
      </div>
    </div>
  )
}

export { UnauthenticatedView }