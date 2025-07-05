import { Tags } from "@/entities/tags";
import React from "react";

const Aside = () => {
  return (
    <aside className="max-w-xs ml-auto w-full p-5 md:h-svh">
      <Tags />
    </aside>
  );
};

export default Aside;
