"use client";

import { useState } from "react";

import {
  LayoutDashboard,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menu = [
  {
    name: "Overview",
    icon: LayoutDashboard,
  },

  {
    name: "Settings",
    icon: Settings,
  },
];

type Props = {
  active: string;
  setActive: (
    value: string
  ) => void;
};

export default function Sidebar({
  active,
  setActive,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* ============================================ */}
      {/* MOBILE MENU BUTTON */}
      {/* ============================================ */}

      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-[60]

          bg-[#0f172a]
          text-white

          p-3
          rounded-xl

          shadow-lg
        "
      >
        <Menu size={22} />
      </button>

      {/* ============================================ */}
      {/* MOBILE OVERLAY */}
      {/* ============================================ */}

      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            z-40
            md:hidden
          "
        />
      )}

      {/* ============================================ */}
      {/* SIDEBAR */}
      {/* ============================================ */}

      <aside
        className={`
          fixed
          md:sticky

          top-0
          left-0

          z-50

          h-screen
          min-h-screen

          w-[280px]
          min-w-[280px]

          bg-[#020817]

          border-r
          border-white/10

          flex
          flex-col

          transition-transform
          duration-300

          overflow-hidden

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* ======================================== */}
        {/* SCROLLABLE CONTENT */}
        {/* ======================================== */}

        <div
          className="
            flex-1
            overflow-y-auto

            px-5
            py-6

            scrollbar-thin
          "
        >
          {/* ======================================== */}
          {/* MOBILE CLOSE */}
          {/* ======================================== */}

          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() =>
                setOpen(false)
              }
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* ======================================== */}
          {/* LOGO */}
          {/* ======================================== */}

          <div className="flex flex-col items-center mb-12">
            <img
              src="/image.png"
              alt="Tarang"
              className="
                w-24
                h-24

                rounded-3xl
                object-cover

                border
                border-white/10

                shadow-2xl
              "
            />

            <h1 className="text-white text-3xl font-bold mt-5">
              Tarang
            </h1>

            <p className="text-white/60 text-sm text-center mt-2 leading-relaxed">
              Area Sales Intelligence
            </p>
          </div>

          {/* ======================================== */}
          {/* MENU */}
          {/* ======================================== */}

          <div className="space-y-3">
            {menu.map((item) => {
              const Icon =
                item.icon;

              const isActive =
                active ===
                item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActive(
                      item.name
                    );

                    setOpen(false);
                  }}
                  className={`
                    w-full

                    flex
                    items-center
                    gap-4

                    px-5
                    py-4

                    rounded-2xl

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-red-600
                          text-white
                          shadow-lg
                        `
                        : `
                          text-white/90
                          hover:bg-white/10
                        `
                    }
                  `}
                >
                  <Icon size={21} />

                  <span className="font-semibold text-[15px]">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================== */}
        {/* FOOTER */}
        {/* ======================================== */}

        <div
          className="
            border-t
            border-white/10

            px-5
            py-5

            text-center
          "
        >
          <p className="text-white/40 text-sm">
            Tarang © 2026
          </p>
        </div>
      </aside>
    </>
  );
}