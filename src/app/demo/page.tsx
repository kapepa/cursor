"use client"

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { useTransition } from "react";

const DemoPage: NextPage = () => {
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
    </div>
  )
}

export default DemoPage;