import React from "react";
import Preview from "@/components/blocks/Preview";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import "./homepage.css";

function Wrapper() {
  return (
    <Suspense>
      <Homepage />
    </Suspense>
  );
}

function Homepage() {
  const searchParams = useSearchParams();

  const src =
    typeof searchParams.get("src") === "string"
      ? searchParams.get("src") || ""
      : "";
  const extension = `${(typeof src === "string" ? src : "").split(".").pop()}`;

  return (
    <div>
      <Preview extension={extension} src={src} />
    </div>
  );
}

export default Wrapper;
