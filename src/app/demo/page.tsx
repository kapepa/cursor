"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { NextPage } from "next";
import { useTransition } from "react";

const DemoPage: NextPage = () => {
  const { userId } = useAuth();
  const [isPendingBlocking, startTransitionBlocking] = useTransition()
  const [isPendingBackground, startTransitionBackground] = useTransition()
  const handlerBlocking = async () => {
    startTransitionBlocking(async () => {
      await fetch("/api/demo/blocking", { method: "POST" })
    })
  }

  const handlerBackground = async () => {
    startTransitionBackground(async () => {
      await fetch("/api/demo/background", { method: "POST" })
    })
  }

  const handleClientError = () => {
    console.log(userId)
    throw new Error("Client error: Something went wrong in the browser!")
  }

  const handleApiError = () => {
    startTransitionBackground(async () => {
      await fetch("/api/demo/error", { method: "POST" })
    })
  }

  const handleInngestError = () => {
    startTransitionBackground(async () => {
      await fetch("/api/demo/inngest-error", { method: "POST" })
    })
  }

  return (
    <div
      className="p-8 space-x-4"
    >
      <Button
        disabled={isPendingBlocking || isPendingBackground}
        onClick={handlerBlocking}
      >
        {isPendingBlocking ? "Loading..." : "Blocking"}
      </Button>
      <Button
        disabled={isPendingBlocking || isPendingBackground}
        onClick={handlerBackground}
      >
        {isPendingBackground ? "Loading..." : "Background"}
      </Button>
      <Button
        variant="destructive"
        onClick={handleClientError}
      >
        Clent Error
      </Button>
      <Button
        variant="destructive"
        onClick={handleApiError}
      >
        API Error
      </Button>
      <Button
        variant="destructive"
        onClick={handleInngestError}
      >
        Inngest Error
      </Button>
    </div>
  )
}

export default DemoPage;