"use client";

import React from "react";

export default function Hero({ profile, initials }) {

  return (
    <section className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-sky-700
      via-sky-500
      to-sky-300
      px-10
      py-16
      max-md:px-5
      max-md:py-12
    ">
      <div className="
        absolute
        -right-24
        -top-24
        h-96
        w-96
        rounded-full
        bg-white/10
        blur-3xl
      "/>
      <div className="
        absolute
        -bottom-24
        -left-20
        h-80
        w-80
        rounded-full
        bg-white/10
        blur-3xl
      "/>
      <div className="
        relative
        z-10
        flex
        items-center
        justify-between
        gap-10
        max-lg:flex-col
        max-lg:items-start
      ">
        <div>
          <div className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-white/10
            px-5
            py-2
            text-sm
            text-white
            backdrop-blur-lg
          ">
            ✨
            <span>
              Premium Owner Profile
            </span>
          </div>
          <h1 className="
            text-5xl
            font-bold
            leading-tight
            text-white
            max-md:text-4xl
          ">
            Welcome,
            <br />
            {profile?.name || "User"}
          </h1>
          <p className="
            mt-5
            max-w-2xl
            text-lg
            leading-8
            text-white/80
          ">

            Manage your account information,
            update your profile details,
            and maintain a professional profile
            for your tenants.
          </p>
        </div>
        <div className="hidden lg:block">


          <div className="
            rounded-[40px]
            border
            border-white/20
            bg-white/10
            p-10
            backdrop-blur-xl
            shadow-2xl
          ">
            <div className="
              flex
              h-40
              w-40
              items-center
              justify-center
              rounded-full
              bg-white
              text-6xl
              font-bold
              text-sky-700
            ">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}