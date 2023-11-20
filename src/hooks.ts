"use client"

import { useCallback, useEffect, useState } from "react";

export const useLocationHash = () => {
  const [path, setPath] = useState("")
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
    setPath(window.location.hash)
  }, []);

  const listenToPopstate = useCallback(() => {
    const hash = window.location.hash

    isClient && setPath(hash)
  }, [isClient])

  useEffect(() => {
    isClient && window.addEventListener("popstate", listenToPopstate)

    return () => {
      isClient && window.removeEventListener("popstate", listenToPopstate)
    }
  }, [isClient, listenToPopstate])

  return path
}