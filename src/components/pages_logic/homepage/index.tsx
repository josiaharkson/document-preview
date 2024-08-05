import React from "react";
import Preview from "@/components/blocks/Preview";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
  const name =
    typeof searchParams.get("name") === "string"
      ? searchParams.get("name") || ""
      : "";

  return (
    <div>
      <Preview extension={extension} src={src} name={name} />
    </div>
  );
}

export default Wrapper;
