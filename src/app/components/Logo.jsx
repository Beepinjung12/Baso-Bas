import React from "react";
import Link from "next/link";
import config from "../config";

const Logo = () => {
  const { appName } = config;

  const appNameParts = appName.split(" ");

  return (
    <Link href="#" className="text-xl">
      <div className="flex items-center justify-start font-playfair text-[22px] font-semibold tracking-[-0.5px] hover:opacity-80">
        <span className="text-sky-700">{appNameParts[0]}</span>
        <span className="text-sky-400">{appNameParts[1]}</span>
      </div>
    </Link>
  );
};

export default Logo;