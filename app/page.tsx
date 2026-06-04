"use client";
import * as XLSX from "xlsx";
import { useEffect, useMemo, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import KPI from "@/components/dashboard/KPI";
import Overview from "@/components/dashboard/Overview";

type Shop = {
  name: string;
  area: string;
  areaKey: string;
  rating: number;
  branch: number;
  score: number;
};

export default function Home() {

  const [showAddShop, setShowAddShop] =
  useState(false);

  const [approvedShops, setApprovedShops] =
  useState<string[]>([]);
  // =====================================================
  // STATES
  // =====================================================

   const [area, setArea] =
  useState("All");

const [category, setCategory] =
  useState("All");

  const [section, setSection] =
    useState("Overview");

  const [shops, setShops] = useState<
    any[]
  >([]);


  
  // =====================================================
  // LOAD JSON
  // =====================================================

  useEffect(() => {
    fetch("/data/shops.json")
      .then((res) => res.json())
      .then((data) => {
        const finalData =
  Array.isArray(data)
    ? data
    : [];

setShops(finalData);


      })
      .catch((err) =>
        console.error(err)
      );
  }, []);

  // =====================================================
  // CLEAN DATA
  // =====================================================

const shopsData: Shop[] =

  shops
  

    /* ================================================= */
    /* REMOVE UNWANTED CATEGORIES */
    /* ================================================= */

    .filter((d: any) => {

      const category =

        (
          d.category ||
          d.Category ||
          ""
        )

          .toString()

          .trim()

          .toLowerCase();

      const blockedCategories = [

        "used furniture store",

        "curtain supplier and maker",

        "window treatment store",

        "wallpaper store",

        "curtain supplier & maker",

        "upholstery shop",

        "plant nursery",

        "window installation store",

        "upholstery",
        
         "gift shop",
        "handicraft",

        "stone",
        

        "antique store",

        "clothes and fabric wholesaler",

        "mattress store",

      ];

      return !blockedCategories.some(
        (blocked) =>
          category.includes(blocked)
      );

    })





    /* ================================================= */
    /* CLEAN DATA */
    /* ================================================= */

    .map((d: any) => {

      const name =

        d["Shop name"] ||

        d["shop name"] ||

        d.name ||

        "Unknown";

      const rawArea =

        (
          d["Area"] ||

          d.area ||

          "Unknown"
        )

          .toString()

          .trim();

      const rating =

        Number(

          d["rating"] ||

          d.rating
        ) || 0;

      const branch =

        Number(

          d["branch count"] ||

          d.branch
        ) || 1;





      const ratingScore =
        (rating / 5) * 60;

      let branchScore = 10;

      if (
        branch > 1 &&
        branch <= 3
      ) {

        branchScore = 20;

      } else if (
        branch <= 10
      ) {

        branchScore = 30;

      } else if (
        branch > 10
      ) {

        branchScore = 40;
      }

      return {

        name,

        area: rawArea,

        areaKey:
          rawArea.toLowerCase(),

        rating,

        branch,

        category:

          d.category ||

          d.Category ||

          "Other",

        score: Math.round(
          ratingScore +
            branchScore
        ),

      };

    })





    /* ================================================= */
    /* REMOVE EMPTY AREAS */
    /* ================================================= */

    .filter((d) => d.area);

    const [search, setSearch] =
  useState("");

const [selectedArea, setSelectedArea] =
  useState("All");

  const [newShop, setNewShop] =
  useState({
    name: "",
    area: "",
    category: "",
    rating: "",
    branch: "",
    score: "",
  });

const [editingShop, setEditingShop] =
  useState<any>(null);

const [editingIndex, setEditingIndex] =
  useState<number | null>(null);

const [showAddModal, setShowAddModal] =
  useState(false);

const [showUploadModal, setShowUploadModal] =
  useState(false);



  // =====================================================
  // FILTERED DATA
  // =====================================================

  const filtered =
    useMemo(() => {
      if (area === "All") {
        return shopsData;
      }

      return shopsData.filter(
        (d) =>
          d.areaKey ===
          area.toLowerCase()
      );
    }, [area, shopsData]);

  // =====================================================
  // LOADING
  // =====================================================

  if (!shops.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f7fb]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-lg font-medium text-black">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <Sidebar
        active={section}
        setActive={setSection}
      />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ================================================= */}
        {/* TOPBAR */}
        {/* ================================================= */}

        <Topbar
  

  area={area}
  setArea={setArea}

  
/>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* ============================================= */}
          {/* OVERVIEW */}
          {/* ============================================= */}

          {section ===
            "Overview" && (
            <>
              {/* KPI */}
              <KPI
                data={filtered}
              />

              {/* DASHBOARD */}
              <Overview
  data={shopsData}
  area={area}
  category={category}
/>
            </>
          )}

          {/* ============================================= */}
          {/* SETTINGS */}
          {/* ============================================= */}

         {section === "Settings" && (

  <div className="space-y-6">

    {/* ====================================================== */}
    {/* HEADER */}
    {/* ====================================================== */}

    <div
      className="
        bg-white
        rounded-[20px]
        border
        border-black/10
        p-4
        shadow-sm

        flex
        flex-col
        xl:flex-row
        xl:items-center
        xl:justify-between

        gap-6
      "
    >

      <div>

        <h1
          className="
            text-[20px]
            md:text-[32px]
            leading-none
            font-black
            text-black
          "
        >
          Admin Settings Center
        </h1>

        <p
          className="
            text-[15px]
            md:text-[16px]
            font-semibold
            text-black
            mt-4
          "
        >
          Manage shops, approvals, tie-ups, uploads and reseller operations.
        </p>

      </div>





      <div
        className="
          flex
          flex-wrap
          gap-5
        "
      >
<div
  className="
    flex
    flex-wrap
    items-center
    gap-3
  "
>

  {/* ADD SHOP */}

  <button

    onClick={() =>
      setShowAddShop(true)
    }

    className="
      bg-black
      hover:bg-[#111111]
      text-white
      h-[40px]
      px-4
      rounded-xl
      text-xs
      font-black
      whitespace-nowrap
      transition-all
    "
  >
    + Add Shop
  </button>

  {/* JSON */}

  <button

    onClick={() => {

      const input =
        document.createElement(
          "input"
        );

      input.type = "file";

      input.accept =
        ".json";

      input.onchange = (
        e: any
      ) => {

        const file =
          e.target.files?.[0];

        if (!file) return;

        const reader =
          new FileReader();

        reader.onload =
          (
            event: any
          ) => {

            try {

              const parsed =
                JSON.parse(
                  event.target
                    .result as string
                );

              if (
                Array.isArray(
                  parsed
                )
              ) {

                setShops(
                  parsed
                );

                localStorage.setItem(
                  "shopsData",
                  JSON.stringify(
                    parsed
                  )
                );

                alert(
                  "JSON Uploaded"
                );

              }

            } catch {

              alert(
                "Invalid JSON"
              );

            }

          };

        reader.readAsText(
          file
        );

      };

      input.click();

    }}

    className="
      bg-black
      hover:bg-[#111111]
      text-white
      h-[40px]
      px-4
      rounded-xl
      text-xs
      font-black
      whitespace-nowrap
      transition-all
    "
  >
    Upload JSON
  </button>

  {/* EXCEL */}

  <button

    onClick={() => {

      const input =
        document.createElement(
          "input"
        );

      input.type = "file";

      input.accept =
        ".xlsx,.xls,.csv";

      input.onchange = async (
        e: any
      ) => {

        try {

          const file =
            e.target.files?.[0];

          if (!file) return;

          const data =
            await file.arrayBuffer();

          const workbook =
            XLSX.read(data);

          const sheetName =
            workbook.SheetNames[0];

          const worksheet =
            workbook.Sheets[
              sheetName
            ];

          const raw =
            XLSX.utils.sheet_to_json(
              worksheet
            );

          const formatted =
            raw.map(
              (item: any) => ({

                name:
                  item.name ||
                  item.Name ||
                  item["Shop Name"] ||
                  "",

                area:
                  item.area ||
                  item.Area ||
                  "",

                category:
                  item.category ||
                  item.Category ||
                  "Other",

                rating:
                  Number(
                    item.rating ||
                    item.Rating ||
                    0
                  ),

                branch:
                  Number(
                    item.branch ||
                    item.Branch ||
                    1
                  ),

                score:
                  Number(
                    item.score ||
                    item.Score ||
                    0
                  ),

                status:
                  item.status ||
                  "Pending",

                approved: false,

              })
            );

          setShops(
            formatted
          );

          localStorage.setItem(
            "shopsData",
            JSON.stringify(
              formatted
            )
          );

          alert(
            "Excel Uploaded"
          );

        } catch {

          alert(
            "Upload Failed"
          );

        }

      };

      input.click();

    }}

    className="
      bg-black
      hover:bg-[#111111]
      text-white
      h-[40px]
      px-4
      rounded-xl
      text-xs
      font-black
      whitespace-nowrap
      transition-all
    "
  >
    Upload Excel
  </button>

  {/* EXPORT */}

  <button

    onClick={() => {

      const worksheet =
        XLSX.utils.json_to_sheet(
          shops
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Shops"
      );

      XLSX.writeFile(
        workbook,
        "shops-data.xlsx"
      );

    }}

    className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      h-[40px]
      px-4
      rounded-xl
      text-xs
      font-black
      whitespace-nowrap
      transition-all
    "
  >
    Export
  </button>

</div>
      </div>

    </div>





    {/* ====================================================== */}
    {/* KPI CARDS */}
    {/* ====================================================== */}

    <div
      className="
        grid
        grid-cols-2
        xl:grid-cols-4
        gap-5
      "
    >

      {[
        {
          title: "Total Shops",
          value: shopsData.length,
          color: "text-blue-600",
        },

        {
          title: "Areas",
          value:
            new Set(
              shopsData.map(
                (d: any) =>
                  d.area
              )
            ).size,

          color: "text-green-600",
        },

        {
          title: "Categories",
          value:
            new Set(
              shopsData.map(
                (d: any) =>
                  d.category
              )
            ).size,

          color: "text-orange-600",
        },

        {
          title: "Premium Shops",
          value:
            shopsData.filter(
              (d: any) =>
                d.score >= 80
            ).length,

          color: "text-red-600",
        },
      ].map((item, index) => (

        <div
          key={index}

          className="
            bg-white
            rounded-[24px]
            border
            border-black/10

            p-5

            shadow-sm
          "
        >

          <p
            className="
              text-[14px]
              font-bold
              text-black
            "
          >
            {item.title}
          </p>





          <h2
            className={`
              text-[38px]
              font-black
              mt-3

              ${item.color}
            `}
          >
            {item.value}
          </h2>

        </div>

      ))}

    </div>





    




    {/* ====================================================== */}
    {/* SHOP MANAGEMENT TABLE */}
    {/* ====================================================== */}

    <div
      className="
        bg-white
        rounded-[28px]
        border
        border-black/10

        shadow-sm
        overflow-hidden
      "
    >

      {/* TABLE HEADER */}

      <div
        className="
          p-5

          border-b
          border-black/10

          flex
          flex-col
          2xl:flex-row
          2xl:items-center
          2xl:justify-between

          gap-4
        "
      >

        <div>

          <h2
            className="
              text-[32px]
              font-black
              text-black
            "
          >
            Shop Management
          </h2>





          <p
            className="
              text-black
              text-sm
              font-semibold
              mt-1
            "
          >
            Live reseller and premium shop database.
          </p>

        </div>





        <div className="flex flex-wrap gap-3">

          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search shops..."

            className="
              h-[50px]
              w-[240px]

              border
              border-black/10

              rounded-2xl

              px-4

              text-sm
              font-bold
              text-black

              outline-none
            "
          />





          <select

            value={selectedArea}

            onChange={(e) =>
              setSelectedArea(
                e.target.value
              )
            }

            className="
              h-[50px]

              border
              border-black/10

              rounded-2xl

              px-4

              text-sm
              font-bold
              text-black

              outline-none
            "
          >

            <option>
              All
            </option>

            {[...new Set(
              shopsData.map(
                (d: any) =>
                  d.area
              )
            )].map(
              (
                area: any,
                index: number
              ) => (

                <option
                  key={index}
                >
                  {area}
                </option>

              )
            )}

          </select>

        </div>

      </div>





      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead
            className="
              bg-[#f8fafc]
              border-b
              border-black/10
            "
          >

            <tr>

              {[
                "Shop",
                "Area",
                "Category",
                "Rating",
                "Branches",
                "Score",
                "Status",
                "Actions",
              ].map((head, index) => (

                <th
                  key={index}

                  className="
                    text-left

                    p-5

                    text-sm
                    font-black
                    text-black
                  "
                >
                  {head}
                </th>

              ))}

            </tr>

          </thead>





          <tbody>

            {shopsData

              .filter(
                (shop: any) => {

                  const matchesSearch =

                    shop.name
                      ?.toLowerCase()
                      .includes(
                        search.toLowerCase()
                      );





                  const matchesArea =

                    selectedArea ===
                      "All" ||

                    shop.area ===
                      selectedArea;





                  return (
                    matchesSearch &&
                    matchesArea
                  );

                }
              )

              

              .map(
                (
                  shop: any,
                  index: number
                ) => (

                  <tr
                    key={index}

                    className="
                      border-b
                      border-black/5

                      hover:bg-[#f8fafc]

                      transition-all
                    "
                  >

                    <td
                      className="
                        p-5
                        font-black
                        text-black
                      "
                    >
                      {shop.name}
                    </td>





                    <td
                      className="
                        p-5
                        font-bold
                        text-black
                      "
                    >
                      {shop.area}
                    </td>





                    <td
                      className="
                        p-5
                        font-bold
                        text-black
                      "
                    >
                      {shop.category}
                    </td>





                    <td
                      className="
                        p-5
                        text-green-600
                        font-black
                      "
                    >
                      {shop.rating}
                    </td>





                    <td
                      className="
                        p-5
                        text-blue-600
                        font-black
                      "
                    >
                      {shop.branch}
                    </td>





                    <td
                      className="
                        p-5
                        text-red-600
                        font-black
                      "
                    >
                      {shop.score}
                    </td>



<td className="p-5">

                    <button

  onClick={() => {

    setApprovedShops([
      ...approvedShops,
      shop.name,
    ]);

  }}

  disabled={approvedShops.includes(
    shop.name
  )}

  className={`
    px-4
    py-2
    rounded-xl
    text-xs
    font-black
    text-white

    ${
      approvedShops.includes(
        shop.name
      )

        ? "bg-green-500 cursor-not-allowed"

        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>

  {approvedShops.includes(
    shop.name
  )

    ? "Approved"

    : "Approve"}

</button>
</td>
                    <td className="p-5">

                      <div className="flex gap-2">

                       <button

 onClick={() => {

  setEditingShop(
    shop
  );





  setEditingIndex(
    index
  );

}}

  className="
    bg-blue-600
    hover:bg-blue-700

    text-white

    px-4
    py-2

    rounded-xl

    text-xs
    font-black
  "
>
  Edit
</button>



                        <button

                          onClick={() => {

  setShops(

    shopsData.filter(
      (
        _: any,
        i: number
      ) =>
        i !== index
    )

  );

}}

                          className="
                            bg-red-600
                            hover:bg-red-700

                            text-white

                            px-4
                            py-2

                            rounded-xl

                            text-xs
                            font-black
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

)}

{editingShop && (

  <div
    className="
      fixed
      inset-0
      z-50

      bg-black/50

      flex
      items-center
      justify-center

      p-5
    "
  >

    <div
      className="
        bg-white
        rounded-[30px]

        w-full
        max-w-[700px]

        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h2
          className="
            text-[30px]
            font-black
            text-black
          "
        >
          Edit Shop
        </h2>





        <button

          onClick={() => {

            setEditingShop(
              null
            );

            setEditingIndex(
              null
            );

          }}

          className="
            text-red-600
            text-[30px]
            font-black
          "
        >
          ×
        </button>

      </div>





      <div
        className="
          grid
          grid-cols-2

          gap-4

          mt-8
        "
      >

        {[
          "name",
          "area",
          "category",
          "rating",
          "branch",
          "score",
        ].map((field) => (

          <input
            key={field}

            value={
              editingShop[field]
            }

            onChange={(e) =>
              setEditingShop({

                ...editingShop,

                [field]:
                  e.target.value,

              })
            }

            className="
              h-[54px]

              border
              border-black/10

              rounded-2xl

              px-4

              font-bold
              text-black
            "
          />

        ))}

      </div>





      <button

        onClick={() => {

          const updated =
            [...shopsData];





          if (
  editingIndex !== null
) {

  updated[
    editingIndex
  ] = editingShop;

}




          setShops(
            updated
          );





          setEditingShop(
            null
          );





          setEditingIndex(
            null
          );

        }}

        className="
          w-full
          h-[56px]

          bg-black

          text-white

          rounded-2xl

          font-black

          mt-8
        "
      >
        Save Changes
      </button>

    </div>

  </div>

)}
{showAddShop && (

  <div
    className="
      fixed
      inset-0
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        w-[650px]
        rounded-[32px]
        p-8
        shadow-2xl
        border
        border-black/10
      "
    >

      <div className="flex items-center justify-between mb-8">

        <h2
          className="
            text-4xl
            font-black
            text-black
          "
        >
          Add New Shop
        </h2>

        <button

          onClick={() =>
            setShowAddShop(false)
          }

          className="
            w-10
            h-10
            rounded-full
            bg-red-100
            text-red-600
            font-black
            hover:bg-red-200
            transition-all
          "
        >
          ✕
        </button>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div>

          <p
            className="
              text-sm
              font-black
              mb-2
              text-black
            "
          >
            Shop Name
          </p>

          <input

            type="text"

            placeholder="Enter shop name"

            value={newShop.name}

            onChange={(e) =>

              setNewShop({

                ...newShop,

                name:
                  e.target.value,

              })

            }

            className="
              w-full
              border-2
              border-black/10
              rounded-2xl
              p-4
              font-bold
              text-black
              outline-none
              focus:border-black
              transition-all
            "
          />

        </div>

        <div>

          <p
            className="
              text-sm
              font-black
              mb-2
              text-black
            "
          >
            Area
          </p>

          <input

            type="text"

            placeholder="Enter area"

            value={newShop.area}

            onChange={(e) =>

              setNewShop({

                ...newShop,

                area:
                  e.target.value,

              })

            }

            className="
              w-full
              border-2
              border-black/10
              rounded-2xl
              p-4
              font-bold
              text-black
              outline-none
              focus:border-black
              transition-all
            "
          />

        </div>

        <div>

          <p
            className="
              text-sm
              font-black
              mb-2
              text-black
            "
          >
            Category
          </p>

          <input

            type="text"

            placeholder="Enter category"

            value={newShop.category}

            onChange={(e) =>

              setNewShop({

                ...newShop,

                category:
                  e.target.value,

              })

            }

            className="
              w-full
              border-2
              border-black/10
              rounded-2xl
              p-4
              font-bold
              text-black
              outline-none
              focus:border-black
              transition-all
            "
          />

        </div>

        <div>

          <p
            className="
              text-sm
              font-black
              mb-2
              text-black
            "
          >
            Rating
          </p>

          <input

            type="number"

            placeholder="4.5"

            value={newShop.rating}

            onChange={(e) =>

              setNewShop({

                ...newShop,

                rating:
                  e.target.value,

              })

            }

            className="
              w-full
              border-2
              border-black/10
              rounded-2xl
              p-4
              font-bold
              text-black
              outline-none
              focus:border-black
              transition-all
            "
          />

        </div>

        <div className="col-span-2">

          <p
            className="
              text-sm
              font-black
              mb-2
              text-black
            "
          >
            Branches
          </p>

          <input

            type="number"

            placeholder="Number of branches"

            value={newShop.branch}

            onChange={(e) =>

              setNewShop({

                ...newShop,

                branch:
                  e.target.value,

              })

            }

            className="
              w-full
              border-2
              border-black/10
              rounded-2xl
              p-4
              font-bold
              text-black
              outline-none
              focus:border-black
              transition-all
            "
          />

        </div>

      </div>

      <div className="flex gap-4 mt-10">

        <button

          onClick={() => {

            const updatedData = [

              ...shopsData,

              {

                ...newShop,

                rating:
                  Number(
                    newShop.rating
                  ),

                branch:
                  Number(
                    newShop.branch
                  ),

                status:
                  "Pending",

              },

            ];

            setShops(
              updatedData
            );

            localStorage.setItem(

              "shopsData",

              JSON.stringify(
                updatedData
              )

            );

            setShowAddShop(
              false
            );

            setNewShop({

  name: "",

  area: "",

  category: "",

  rating: "",

  branch: "",

  score: "",

});

          }}

          className="
            flex-1
            bg-black
            hover:bg-gray-900
            text-white
            py-4
            rounded-2xl
            font-black
            text-lg
            transition-all
          "
        >
          Save Shop
        </button>

        <button

          onClick={() =>
            setShowAddShop(false)
          }

          className="
            flex-1
            bg-red-600
            hover:bg-red-700
            text-white
            py-4
            rounded-2xl
            font-black
            text-lg
            transition-all
          "
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
        </main>
      </div>
    </div>
  );
}