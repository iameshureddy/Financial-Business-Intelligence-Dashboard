"use client";

type Props = {
  section: string;
};

export default function Settings({
  section,
}: Props) {

  if (
    section !== "Settings"
  ) {
    return null;
  }

  return (

    <div className="space-y-5">

      <div
        className="
          bg-white
          rounded-3xl
          p-6
          border
          border-black/10
        "
      >

        <h2
          className="
            text-3xl
            font-black
            text-black
          "
        >
          Settings
        </h2>

        <p
          className="
            mt-3
            text-black
            font-semibold
          "
        >
          Manage dashboard
          settings and controls.
        </p>

      </div>

    </div>

  );

}