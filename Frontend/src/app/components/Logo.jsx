
import config from "../config";

import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="no-underline">
      <div className="flex items-center justify-start hover:opacity-80">
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "26px",
            fontWeight: "600",
            color: "#0369a1",
            letterSpacing: "-0.5px",
          }}
        >
          BASO
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "26px",
            fontWeight: "600",
            color: "#38bdf8",
            letterSpacing: "-0.5px",
          }}
        >
          BAS
        </span>
      </div>
    </Link>
  );
};

export default Logo;
