"use client";

import { MapPin } from "lucide-react";

type Props = {
  area: string;
  setArea: (val: string) => void;
};

export default function Topbar({
  area,
  setArea,
}: Props) {

  const areas = [
    "All",
    "Ameerpet",
    "Banjara Hills",
    "Begumpet",
    "Dilsukhnagar",
    "Gachibowli",
    "HITEC City",
    "Jubilee Hills",
    "Kondapur",
    "Kukatpally",
    "LB Nagar",
    "Madhapur",
    "Mehdipatnam",
    "Nampally",
    "Secunderabad",
    "Somajiguda",
  ];

  return (

    <header
      className="
        w-full

        bg-gradient-to-r
        from-[#5f0000]
        via-[#7a0000]
        to-[#8b0000]

        px-6
        md:px-8

        py-5

        flex
        flex-col
        lg:flex-row

        items-start
        lg:items-center

        justify-between

        gap-5

        shadow-lg
      "
    >

      {/* LEFT */}

      <div>

        <h1
          className="
            text-white
            text-[28px]
            md:text-[34px]
            font-black
            tracking-wide
          "
        >
          Area-wise Insights & Market Analysis
        </h1>

        <p
          className="
            text-red-100
            text-sm
            font-semibold
            mt-1
          "
        >
          Explore businesses across Hyderabad for premium reseller opportunities.
        </p>

      </div>





      {/* RIGHT */}

      <div
        className="
          bg-white

          rounded-2xl

          px-5
          py-3

          flex
          items-center
          gap-3

          shadow-md
        "
      >

        <MapPin
          size={18}
          className="text-red-700"
        />

        <select
          value={area}

          onChange={(e) =>
            setArea(e.target.value)
          }

          className="
            bg-transparent
            outline-none

            text-black
            font-bold
            text-sm

            cursor-pointer
          "
        >

          {areas.map((a) => (

            <option
              key={a}
              value={a}
            >
              {a === "All"
                ? "All Areas"
                : a}
            </option>

          ))}

        </select>

      </div>

    </header>

  );
}