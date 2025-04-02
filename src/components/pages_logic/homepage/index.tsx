import React, { useEffect, useState } from "react";
import Preview from "@/components/blocks/Preview";

import { useSearchParams, useRouter } from "next/navigation";
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

  const [data, setData] = useState({
    src: "",
    extension: "",
    name: "",
  });

  useEffect(() => {
    const src = window.location.href.split("?src=")[1];
    setData({
      src,
      extension: `${(typeof src === "string" ? src : "")
        .split(".")
        .pop()}`.split("?")[0],
      name:
        typeof searchParams.get("name") === "string"
          ? searchParams.get("name") || ""
          : "",
    });
  }, []);
  console.log("data", data);
  const { extension, name, src } = data || {};
  return <Preview extension={extension} src={src} name={name} />;
}

export default Wrapper;
