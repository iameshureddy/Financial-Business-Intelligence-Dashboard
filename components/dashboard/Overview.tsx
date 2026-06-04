"use client";
import { useState } from "react";
import {
  ResponsiveContainer,
  Treemap,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
   RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  
  Sankey,
  ScatterChart,
Scatter,
ZAxis,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";

type Props = {
  data: any[];
  area: string;
  category: string;
};

export default function Overview({
  data,
  area,
  category,
  }: Props) {
  // =====================================================
  // SAFE DATA
  // =====================================================

  const safeData =
  Array.isArray(data)
    ? data
    : [];


const [selectedCategory, setSelectedCategory] =
  useState<any>(null);

const filteredData =
  safeData.filter((item: any) => {

    const areaMatch =
      area === "All" ||
      item.area === area;

    const categoryMatch =
      category === "All" ||
      item.category === category;

      

    return (
      areaMatch &&
      categoryMatch
    );

  });

   // =====================================================
// CATEGORY DATA
// =====================================================


const categoryMap: any = {};

safeData.forEach((item: any) => {

  const category =
    item.category ||
    "Other";

  if (!categoryMap[category]) {

    categoryMap[category] = {

      category,

      count: 0,

      shops: [],

    };
  }

  categoryMap[category].count += 1;

  categoryMap[category].shops.push(
    item.name
  );

});

const categoryData =
  Object.values(categoryMap)

    .sort(
      (a: any, b: any) =>
        b.count - a.count
    );

  // =====================================================
  // COLORS
  // =====================================================

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#ea580c",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
    "#db2777",
  ];

  // =====================================================
  // BAR COLOR
  // =====================================================

  const getColor = (
    score: number
  ) => {

    if (score >= 85) {
      return "#16a34a";
    }

    if (score >= 70) {
      return "#2563eb";
    }

    if (score >= 55) {
      return "#ea580c";
    }

    return "#dc2626";
  };

  // =====================================================
  // CHART 1
  // TOP 20 PRIORITY SHOPS
  // =====================================================

  const rankedShops =
    filteredData
      .map((item: any) => {

        const business =
  item.name || "Business";

        const area =
          item.area ||
          item.Area ||
          "Unknown";

        const rating =
          Number(
            item.rating ||
            item.Rating
          ) || 0;

        const branches =
          Number(
            item.branch ||
            item.branches ||
            item[
              "branch count"
            ]
          ) || 1;

        // SCORE

        const ratingScore =
          (rating / 5) * 70;

        const branchScore =
          Math.min(
            branches * 10,
            30
          );

        const priorityScore =
          Math.round(
            ratingScore +
            branchScore
          );

          const heatmapData = [

  {
    x: 1,
    y: 1,
    z: 20,
    area: "Banjara Hills",
    category: "Furniture Store",
  },

  {
    x: 2,
    y: 1,
    z: 15,
    area: "Banjara Hills",
    category: "Luxury Furniture",
  },

  {
    x: 1,
    y: 2,
    z: 10,
    area: "Madhapur",
    category: "Office Furniture",
  },

  {
    x: 3,
    y: 2,
    z: 25,
    area: "Madhapur",
    category: "Interior",
  },

];

        return {
          business,
          area,
          rating,
          branches,
          priorityScore,
        };
      })

      .sort(
        (a, b) =>
          b.priorityScore -
          a.priorityScore
      )

      .slice(0, 20);


  // =====================================================
  // CHART 2
  // HIGH POTENTIAL AREAS
  // =====================================================

  const areaRankingData =
    Object.values(

      filteredData.reduce(
        (
          acc: any,
          item: any
        ) => {

          const area =
            item.area ||
            item.Area ||
            "Unknown";

          const rating =
            Number(
              item.rating ||
              item.Rating
            ) || 0;

          const branches =
            Number(
              item.branch ||
              item.branches ||
              item[
                "branch count"
              ]
            ) || 1;

          if (!acc[area]) {

            acc[area] = {
              area,
              totalRating: 0,
              totalBranches: 0,
              shops: 0,
            };
          }

          acc[area].shops += 1;

          acc[area].totalRating +=
            rating;

          acc[area].totalBranches +=
            branches;

          return acc;

        },
        {}
      )

    )

      .map((item: any) => {

        const avgRating =
          item.totalRating /
          item.shops;

        const avgBranches =
          item.totalBranches /
          item.shops;

        const ratingScore =
          (avgRating / 5) * 70;

        const branchScore =
          Math.min(
            avgBranches * 10,
            30
          );

        return {

          area: item.area,

          totalShops:
            item.shops,

          marketScore:
            Math.round(
              ratingScore +
              branchScore
            ),
        };
      })

      .sort(
        (a: any, b: any) =>
          b.marketScore -
          a.marketScore
      )

      .slice(0, 15);

  // =====================================================
  // CHART 3
  // CATEGORY OPPORTUNITIES
  // =====================================================
   
  const categoryOpportunityData =
    Object.values(

      filteredData.reduce(
        (
          acc: any,
          item: any
        ) => {

          const category =
            item.category ||
            item.Category ||
            "Other";

          if (!acc[category]) {

            acc[category] = {
              category,
              count: 0,
            };
          }

          acc[category].count += 1;

          return acc;

        },
        {}
      )

    )

      .map((item: any) => ({
        category:
          item.category,

        value:
          item.count,
      }))

      .sort(
        (a: any, b: any) =>
          b.value -
          a.value
      );

  // =====================================================
  // TOOLTIP
  // =====================================================

  const CustomTooltip = ({
    active,
    payload,
  }: any) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      const item =
        payload[0].payload;




        // =====================================================
// CATEGORY DATA FROM shops.json
// =====================================================

const categoryMap: any = {};

safeData.forEach((item: any) => {
  const category =
    item.category ||
    "Other";

  if (!categoryMap[category]) {

    categoryMap[category] = {

      category,

      count: 0,
    };
  }

  categoryMap[category].count += 1;

});

const totalBusinesses =
  safeData.length || 1;

const categoryData =
  Object.values(categoryMap)

    .map((item: any) => ({

      category: item.category,

      count: item.count,

      percentage:
        Number(
          (
            (item.count /
              totalBusinesses) *
            100
          ).toFixed(1)
        ),

    }))

    .sort(
      (a: any, b: any) =>
        b.percentage -
        a.percentage
    );
      return (

        <div
          className="
            bg-white

            border
            border-gray-200

            rounded-2xl

            p-4

            shadow-xl
          "
        >

          {item.business && (

            <>

              <h3 className="text-black font-black text-lg">

                {item.business}

              </h3>

              <div className="space-y-2 mt-3">

                <p className="text-black font-semibold">
                  📍 Area :
                  <span className="ml-2 font-black">
                    {item.area}
                  </span>
                </p>

                <p className="text-black font-semibold">
                  ⭐ Rating :
                  <span className="ml-2 font-black">
                    {item.rating}
                  </span>
                </p>

                <p className="text-black font-semibold">
                  🔗 Branches :
                  <span className="ml-2 font-black">
                    {item.branches}
                  </span>
                </p>

                <p className="text-black font-semibold">
                  🎯 Score :
                  <span className="ml-2 font-black text-green-600">
                    {
                      item.priorityScore
                    }/100
                  </span>
                </p>

              </div>

            </>

          )}

          {item.marketScore && (

            <>

              <h3 className="text-black font-black text-lg">

                {item.area}

              </h3>

              <div className="space-y-2 mt-3">

                <p className="text-black font-semibold">
                  🏪 Shops :
                  <span className="ml-2 font-black">
                    {
                      item.totalShops
                    }
                  </span>
                </p>

                <p className="text-black font-semibold">
                  🎯 Market Score :
                  <span className="ml-2 font-black text-blue-600">
                    {
                      item.marketScore
                    }/100
                  </span>
                </p>

              </div>

            </>

          )}

        </div>
      );
    }

    return null;
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="space-y-6 w-full">

      {/* ================================================= */}
      {/* ROW 1 */}
      {/* ================================================= */}

      <div
  className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-5
  "
>

        {/* ============================================= */}
        {/* CHART 1 */}
        {/* ============================================= */}

        <div
          className="
            bg-white

            rounded-[18px]

            border
            border-gray-200

            p-5

            shadow-sm
          "
        >

          <div className="mb-6">

            <h2 className="text-[28px] font-black text-[#0f172a]">

              Top 20 Businesses to Target First

            </h2>

            <p className="text-black mt-3 text-[15px] leading-7 font-semibold">

              Priority score is calculated using customer ratings (70%) and branch scalability (30%).

            </p>

          </div>

          <div
  className="
    h-[280px]
    overflow-y-auto
    pr-2
  "
>

            <ResponsiveContainer
  width="100%"
  height={
    Math.max(
      rankedShops.length * 42,
      30
    )
  }
>

              <BarChart
                data={rankedShops}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 40,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{
                    fill: "#000",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="business"
                  width={100}
                  tick={{
                    fill: "#000",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

                <Bar
                  dataKey="priorityScore"
                  radius={[
                    0,
                    10,
                    10,
                    0,
                  ]}
                  barSize={15}
                >

                  {rankedShops.map(
                    (
                      item,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={getColor(
                          item.priorityScore
                        )}
                      />

                    )
                  )}

                  <LabelList
                    dataKey="priorityScore"
                    position="right"
                    formatter={(v: any) => `${v}/100`}
                    style={{
                      fill: "#000",
                      fontWeight: 100,
                      fontSize: 11,
                    }}
                  />

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ============================================= */}
        {/* CHART 2 */}
        {/* ============================================= */}

        <div
  className="
    bg-white
    rounded-[18px]
    border
    border-gray-200
    p-4
    shadow-sm
    h-[460px]
  "
>

  {/* HEADER */}

  <div className="mb-3">

    <h2
      className="
        text-[22px]
        font-bold
        text-[#0f172a]
      "
    >
      High-Potential Market Areas
    </h2>

    <p className="text-black mt-3 text-[15px] leading-7 font-semibold">
      Top performing areas based on reseller opportunity score.
    </p>

  </div>





  {/* CHART */}
<div className="overflow-x-auto overflow-y-hidden pb-2">

  <div className="min-w-[900px] h-[360px]">

<ResponsiveContainer
  width="100%"
  height="100%"
>

  <BarChart
    data={areaRankingData}
    barCategoryGap="2%"
    margin={{
      top: 5,
      right: 0,
      left: -20,
      bottom: 10,
    }}
  >

      <CartesianGrid
        vertical={false}
        stroke="#f1f5f9"
      />





      <XAxis

        dataKey="area"

        interval={0}

        angle={-25}

        textAnchor="end"

        tick={{
          fill: "#02060c",
          fontWeight: 500,
          fontSize: 9,
        }}

        axisLine={false}

        tickLine={false}
      />





      <YAxis

  domain={[0, 100]}

  tick={{
    fill: "#09348b",
    fontSize: 10,
    fontWeight: 500,
  }}

  axisLine={false}

  tickLine={false}
/>





      <Tooltip

        cursor={{
          fill:
            "rgba(0,0,0,0.03)",
        }}

        contentStyle={{
          background: "#fff",
          border:
            "1px solid #e5e7eb",
          borderRadius: "10px",
          fontWeight: 600,
          color: "#111827",
        }}
      />





      <Bar

        dataKey="marketScore"

        radius={[
          6,
          6,
          0,
          0,
        ]}

        barSize={20}
      >

        {areaRankingData
          .slice(0, 5)
          .map(
            (
              item: any,
              index: number
            ) => (

              <Cell
                key={index}

                fill={
                  COLORS[
                    index %
                    COLORS.length
                  ]
                }
              />

            )
          )}







        <LabelList

          dataKey="marketScore"

          position="top"

          style={{
            fill: "#111827",
            fontWeight: 600,
            fontSize: 8,
          }}
        />

      </Bar>

    </BarChart>

  </ResponsiveContainer>
  </div>

</div>

</div>

</div>
{/* ================================================= */}
{/* ROW 2 */}
{/* CHART 3 + CHART 4 */}
{/* ================================================= */}

<div
  className="
    grid
    grid-cols-1
    2xl:grid-cols-2
    gap-3
    items-start
  "
>

  {/* ================================================= */}
  {/* CHART 3 */}
  {/* CATEGORY TREEMAP */}
  {/* ================================================= */}

  <div
  className="
    bg-white
    rounded-[20px]
    border
    border-black/10
    p-5
    shadow-sm
  "
>

  {/* HEADER */}

  <div className="mb-6">

    <h2
      className="
        text-[28px]
        font-black
        text-black
      "
    >
      Category-Wise Shop Distribution
    </h2>

    <p
      className="
        text-[12px]
        font-semibold
        text-black
        mt-2
      "
    >
      Click category blocks to view shop details.
    </p>

  </div>





  {/* TREEMAP */}

  <div
    className="
      w-full
      h-[420px]
    "
  >

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <Treemap

        data={
          categoryData.map(
            (
              item: any,
              index: number
            ) => ({

              name:
                item.category,

              size:
                item.count,

              fill:
                COLORS[
                  index %
                  COLORS.length
                ],

            })
          )
        }

        dataKey="size"

        stroke="#fff"

        aspectRatio={4 / 3}

        onClick={(data: any) => {

          if (data?.name) {

            const relatedBusinesses =

              safeData.filter(
                (item: any) =>

                  item.category ===
                  data.name
              );





            setSelectedCategory({

              category:
                data.name,

              businesses:
                relatedBusinesses,

            });

          }

        }}

        content={(props: any) => {

          const {
            x,
            y,
            width,
            height,
            name,
            fill,
            size,
          } = props;





          // HIDE VERY SMALL BLOCKS

          if (
            width < 45 ||
            height < 32
          ) {
            return <g />;
          }







          // RESPONSIVE FONT SIZE

          const titleSize =
            Math.min(
              width / 9,
              12
            );





          // SHORT NAME

          const shortName =
            name.length > 18
              ? `${name.slice(0, 16)}...`
              : name;







          return (

            <g>

              {/* BOX */}

              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                  fill,
                  stroke:
                    "rgba(0,0,0,0.72)",
                  strokeWidth: 2,
                  cursor: "pointer",
                }}
                rx={6}
              />







              {/* CATEGORY NAME */}

              <text
                x={x + width / 2}
                y={y + height / 2 - 8}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={
                  Math.max(
                    titleSize,
                    5
                  )
                }
                fontWeight="400"
                style={{
                  pointerEvents:
                    "none",
                }}
              >

                <tspan
                  x={x + width / 2}
                  dy="0"
                >
                  {
                    shortName
                      .split(" ")[0]
                  }
                </tspan>

                <tspan
                  x={x + width / 2}
                  dy="14"
                >
                  {
                    shortName
                      .split(" ")
                      .slice(1)
                      .join(" ")
                  }
                </tspan>

              </text>







              {/* SHOP COUNT */}

              {

                width > 70 &&
                height > 45 && (

                  <text
                    x={
                      x +
                      width / 2
                    }
                    y={
                      y +
                      height / 2 +
                      22
                    }
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.82)"
                    fontSize={10}
                    fontWeight="200"
                    style={{
                      pointerEvents:
                        "none",
                    }}
                  >
                    {size} Shops
                  </text>

                )
              }

            </g>

          );

        }}
      >

        <Tooltip />

      </Treemap>

    </ResponsiveContainer>

  </div>

</div>



  {/* ================================================= */}
  {/* CHART 4 */}
  {/* BRAND SCALABILITY */}
  {/* ================================================= */}

  <div
    className="
      bg-white
      rounded-[20px]
      border
      border-black/10
      p-4
      shadow-sm
    "
  >

    {/* HEADER */}

    <div className="mb-6">

      <h2
        className="
          text-[30px]
          font-black
          text-black
        "
      >
        Brand Scalability Distribution
      </h2>

      <p
        className="
          text-[15px]
          font-semibold
          text-black
          mt-2
        "
      >
        Bubble size represents branch scalability and expansion strength.
      </p>

    </div>





    {(() => {

      const scatterData =

        filteredData

          .filter(
            (item: any) =>

              Number(
                item.branch ||
                item.branches ||
                item["branch count"] ||
                1
              ) > 1
          )

          .map((item: any) => ({

            x:
              Number(
                item.branch ||
                item.branches ||
                item["branch count"] ||
                1
              ),

            y:
              Number(
                item.score ||
                60
              ),

            z:
              Number(
                item.rating ||
                3
              ) * 250,

            fullName:
              item.name,

            category:
              item.category,

            branches:
              Number(
                item.branch ||
                item.branches ||
                item["branch count"] ||
                1
              ),

            score:
              Number(
                item.score ||
                60
              ),

          }))

          .sort(
            (a: any, b: any) =>
              b.score - a.score
          )

          .slice(0, 25);





      return (

        <div
          className="
            w-full
            h-[420px]
          "
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <ScatterChart

              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 20,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#d1d5db"
              />





              <XAxis

                type="number"

                dataKey="x"

                tick={{
                  fill: "#000",
                  fontWeight: 800,
                  fontSize: 12,
                }}

                label={{
                  value:
                    "Branch Count",

                  position:
                    "insideBottom",

                  offset: -5,

                  fill: "#000",

                  fontWeight: 900,
                }}
              />





              <YAxis

                type="number"

                dataKey="y"

                domain={[50, 100]}

                tick={{
                  fill: "#000",
                  fontWeight: 800,
                  fontSize: 12,
                }}

                label={{
                  value:
                    "Business Score",

                  angle: -90,

                  position:
                    "insideLeft",

                  fill: "#000",

                  fontWeight: 900,
                }}
              />





              <ZAxis

                type="number"

                dataKey="z"

                range={[120, 1200]}
              />





              <Tooltip

                content={({ active, payload }: any) => {

                  if (
                    active &&
                    payload &&
                    payload.length
                  ) {

                    const data =
                      payload[0].payload;

                    return (

                      <div
                        className="
                          bg-white
                          border
                          border-gray-200
                          rounded-2xl
                          p-4
                          shadow-xl
                        "
                      >

                        <h3
                          className="
                            text-black
                            font-black
                            text-lg
                          "
                        >
                          {data.fullName}
                        </h3>

                        <div className="space-y-2 mt-3">

                          <p className="text-black font-semibold">
                            Category :
                            <span className="ml-2 font-black">
                              {data.category}
                            </span>
                          </p>

                          <p className="text-black font-semibold">
                            Branches :
                            <span className="ml-2 font-black">
                              {data.branches}
                            </span>
                          </p>

                          <p className="text-black font-semibold">
                            Score :
                            <span className="ml-2 font-black text-green-600">
                              {data.score}
                            </span>
                          </p>

                        </div>

                      </div>

                    );
                  }

                  return null;
                }}
              />





              <Scatter
                data={scatterData}
              >

                {scatterData.map(
                  (
                    _: any,
                    index: number
                  ) => (

                    <Cell

                      key={index}

                      fill={

                        [
                          "#2563eb",
                          "#16a34a",
                          "#ea580c",
                          "#9333ea",
                          "#dc2626",
                          "#0891b2",
                          "#ca8a04",
                          "#7c3aed",
                        ][
                          index % 8
                        ]
                      }

                      stroke="#fff"

                      strokeWidth={2}
                    />

                  )
                )}

              </Scatter>

            </ScatterChart>

          </ResponsiveContainer>

        </div>

      );

    })()}

  </div>

</div>






{/* ================================================= */}
{/* ROW 3 */}
{/* FUNNEL + STACKED AREA */}
{/* ================================================= */}

<div
  className="
    grid
    grid-cols-1

    xl:grid-cols-1 xl:grid-cols-2

    gap-6
    w-full
  "
>



{/* ================================================= */}
{/* CHART 5 */}
{/* EXECUTIVE FUNNEL */}
{/* ================================================= */}

<div
  className="
    bg-white
    rounded-[20px]
    border
    border-black/10
    p-4
    shadow-s
    min-h-[300px]
    h-auto
  "
>

  {/* HEADER */}

  <div className="mb-8">

    <h2
      className="
        text-[20px] sm:text-[32px]
        font-black
        text-black
      "
    >
      Premium Seller Qualification 
    </h2>

    <p
      className="
        text-black
        font-semibold
        mt-2
      "
    >
      Progressive reduction from total market to luxury dealer opportunities.
    </p>

  </div>





  {(() => {

    // =================================================
    // FILTERS
    // =================================================

    const total =
      filteredData || [];





    const premium =

      total.filter(
        (item: any) => {

          const category =
            (
              item.category || ""
            ).toLowerCase();





          return (

            category.includes(
              "interior"
            ) ||

            category.includes(
              "architect"
            ) ||

            category.includes(
              "furniture"
            ) ||

            category.includes(
              "luxury"
            ) ||

            category.includes(
              "modular"
            )

          );

        }
      );





    const rated =

      premium.filter(
        (item: any) =>

          Number(
            item.rating || 0
          ) >= 4
      );





    const scalable =

      rated.filter(
        (item: any) =>

          Number(
            item.branch ||
            item.branches ||
            1
          ) >= 2
      );





    const luxury =

      scalable.filter(
        (item: any) =>

          Number(
            item.rating || 0
          ) >= 4.4
      );





    const funnelData = [

      {
        label:
          "Total Market",

        value:
          total.length,

        width:
          "90%",

        color:
          "from-red-500 to-red-600",

        businesses:
          total,
      },

      {
        label:
          "Premium Categories",

        value:
          premium.length,

        width:
          "80%",

        color:
          "from-pink-600 to-purple-600",

        businesses:
          premium,
      },

      {
        label:
          "High Rated",

        value:
          rated.length,

        width:
          "72%",

        color:
          "from-purple-700 to-violet-700",

        businesses:
          rated,
      },

      {
        label:
          "Scalable Sellers",

        value:
          scalable.length,

        width:
          "44%",

        color:
          "from-blue-600 to-indigo-700",

        businesses:
          scalable,
      },

      {
        label:
          "Luxury Targets",

        value:
          luxury.length,

        width:
          "38%",

        color:
          "from-cyan-500 to-blue-500",

        businesses:
          luxury,
      },

    ];

 



    return (

      <div
        className="
          flex
          flex-col
          items-center
          mt-10
        "
      >

        {funnelData.map(
          (
            item: any,
            index: number
          ) => (

            <div
  key={index}

  title="Click to view businesses"

  onClick={() =>

    setSelectedCategory({

      category:
        item.label,

      businesses:
        item.businesses || [],

    })

  }

  className="
    cursor-pointer

    transition-all
    duration-300

    hover:scale-[1.02]

    hover:brightness-110

    mb-[3px]
  "

  style={{
    width:
      item.width,
  }}
>

              <div
                className={`
                  bg-gradient-to-r
                  ${item.color}

                  h-[72px]

                  flex
                  items-center
                  justify-center

                  relative

                  shadow-lg
                `}
              >

                <div
  className="
    flex
    items-center
    justify-between
    w-full
    px-8
  "
>

  <div
    className="
      text-white
      text-[14px]
      font-black
      leading-none
    "
  >
    {item.label}
  </div>

  <div
    className="
      text-white
      text-[22px]
      font-black
      leading-none
    "
  >
    {item.value}
  </div>

</div>

                {/* CENTER VALUE */}

                <div
                  className="
                    text-white
                    text-[28px]
                    font-black
                  "
                >
                 
                </div>

              </div>

            </div>

          )
        )}

      </div>

    );

  })()}

</div>





{/* ================================================= */}
{/* CHART 6 */}
{/* STACKED AREA FLOW */}
{/* ================================================= */}

<div
  className="
    bg-white
    rounded-[20px]
    border
    border-black/10
    p-4
    shadow-sm
    min-h-[300px]
h-auto
  "
>

  {/* HEADER */}

  <div className="mb-8">

    <h2
      className="
        text-[20px] sm:text-[32px]
        font-black
        text-black
      "
    >
      Area Premium Flow Intelligence
    </h2>

    <p
      className="
        text-black
        font-semibold
        mt-2
      "
    >
      Stacked area visualization of premium business concentration across top-performing areas.
    </p>

  </div>





  {(() => {

    // =================================================
    // AREA MAP
    // =================================================

    const areaMap: any = {};





    (filteredData || []).forEach(
      (item: any) => {

        const area =
          item.area ||
          "Unknown";





        if (
          !areaMap[area]
        ) {

          areaMap[area] = {

            area,

            total: 0,

            premium: 0,

            scalable: 0,

            luxury: 0,

            businesses: [],

          };

        }





        areaMap[area]
          .businesses.push(
            item
          );





        areaMap[area]
          .total += 1;





        if (
          Number(
            item.rating || 0
          ) >= 4
        ) {

          areaMap[area]
            .premium += 1;

        }





        if (
          Number(
            item.branch ||
            item.branches ||
            1
          ) >= 2
        ) {

          areaMap[area]
            .scalable += 1;

        }





        if (
          Number(
            item.rating || 0
          ) >= 4.4
        ) {

          areaMap[area]
            .luxury += 1;

        }

      }
    );





    const areaData =

      Object.values(
        areaMap
      )

        .sort(
          (a: any, b: any) =>
            b.total -
            a.total
        )

        .slice(0, 10);





    return (

      <ResponsiveContainer
        width="100%"
        height={380}
      >

        <AreaChart

          data={areaData}

          onClick={(state: any) => {

            if (
              state &&
              state.activePayload &&
              state.activePayload[0]
            ) {

              const data =
                state
                  .activePayload[0]
                  .payload;





              setSelectedCategory({

                category:
                  data.area,

                businesses:
                  data.businesses || [],

              });

            }

          }}

          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 10,
          }}
        >

          {/* GRADIENTS */}

          <defs>

            <linearGradient
              id="blueArea"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#93c5fd"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#93c5fd"
                stopOpacity={0.2}
              />

            </linearGradient>





            <linearGradient
              id="yellowArea"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#fde047"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#fde047"
                stopOpacity={0.2}
              />

            </linearGradient>





            <linearGradient
              id="orangeArea"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#fb923c"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#fb923c"
                stopOpacity={0.2}
              />

            </linearGradient>





            <linearGradient
              id="greenArea"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#a3e635"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#a3e635"
                stopOpacity={0.2}
              />

            </linearGradient>

          </defs>





          <CartesianGrid
            strokeDasharray="3 3"
            
          />





          <XAxis
            dataKey="area"

            tick={{
  fill: "#000000",
  fontWeight: 900,
  fontSize: 13,
}}
          />





          <YAxis
            tick={{
  fill: "#000000",
  fontWeight: 900,
  fontSize: 13,
}}
          />





         <Tooltip

  contentStyle={{

    backgroundColor: "#ffffff",

    border: "2px solid #e5e7eb",

    borderRadius: "16px",

    color: "#000000",

    fontWeight: 800,

  }}

  labelStyle={{

    color: "#000000",

    fontWeight: 900,

  }}

  itemStyle={{

    color: "#000000",

    fontWeight: 800,

  }}

/>





          <Area
            type="monotone"
            dataKey="total"
            stackId="1"
            stroke="#93c5fd"
            fill="url(#blueArea)"
          />





          <Area
            type="monotone"
            dataKey="premium"
            stackId="1"
            stroke="#fde047"
            fill="url(#yellowArea)"
          />





          <Area
            type="monotone"
            dataKey="scalable"
            stackId="1"
            stroke="#fb923c"
            fill="url(#orangeArea)"
          />





          <Area
            type="monotone"
            dataKey="luxury"
            stackId="1"
            stroke="#a3e635"
            fill="url(#greenArea)"
          />

        </AreaChart>

      </ResponsiveContainer>

    );

  })()}

</div>

</div>

  
    
  {/* SHOP DETAILS */}

  {/* ================================================= */}
{/* CATEGORY DETAILS FULL SCREEN */}
{/* ================================================= */}

{selectedCategory && (

  <div
    className="
      fixed
      inset-0
      z-50

      bg-black/50

      flex
      items-center
      justify-center

      p-4
    "
  >

    <div
      className="
        bg-white

        w-full
        max-w-[1400px]

        h-[92vh]

        rounded-[32px]

        overflow-hidden

        shadow-2xl

        flex
        flex-col
      "
    >

      {/* TOP BAR */}

      <div
        className="
          flex
          items-center
          justify-between

          px-8
          py-6

          border-b
          border-gray-200
        "
      >

        <div>

          <h2
            className="
              text-[34px]
              font-black
              text-black
            "
          >
            {selectedCategory.category}
          </h2>

          <p
            className="
              text-black
              font-semibold
              mt-1
            "
          >
            Complete business details and reseller analysis.
          </p>

        </div>

        <button
          onClick={() =>
            setSelectedCategory(null)
          }

          className="
            bg-red-600
            hover:bg-red-700

            text-white

            px-5
            py-3

            rounded-2xl

            font-bold
          "
        >
          Close
        </button>

      </div>




{/* KPI SECTION */}

<div
  className="
    grid
    grid-cols-2
    md:grid-cols-4
    gap-5
    px-8
    py-6
    border-b
    border-gray-200
  "
>

  {/* TOTAL SHOPS */}

  <div
    className="
      bg-[#f8fafc]
      rounded-2xl
      p-5
    "
  >

    <p
      className="
        text-sm
        font-bold
        text-gray-500
      "
    >
      Total Shops
    </p>

    <h3
      className="
        text-[30px]
        font-black
        text-black
        mt-2
      "
    >
      {
        selectedCategory
          ?.businesses
          ?.length || 0
      }
    </h3>

  </div>





  {/* AVG RATING */}

  <div
    className="
      bg-[#f8fafc]
      rounded-2xl
      p-5
    "
  >

    <p
      className="
        text-sm
        font-bold
        text-gray-500
      "
    >
      Avg Rating
    </p>

    <h3
      className="
        text-[30px]
        font-black
        text-black
        mt-2
      "
    >
      {
        (
          (
            selectedCategory
              ?.businesses || []
          )

            .reduce(
              (
                acc: number,
                item: any
              ) =>

                acc +

                Number(
                  item.rating || 0
                ),

              0
            ) /

          (
            selectedCategory
              ?.businesses
              ?.length || 1
          )

        ).toFixed(1)
      }
    </h3>

  </div>





  {/* AVG SCORE */}

  <div
    className="
      bg-[#f8fafc]
      rounded-2xl
      p-5
    "
  >

    <p
      className="
        text-sm
        font-bold
        text-gray-500
      "
    >
      Avg Score
    </p>

    <h3
      className="
        text-[30px]
        font-black
        text-black
        mt-2
      "
    >
      {

        Math.round(

          (
            selectedCategory
              ?.businesses || []
          )

            .reduce(
              (
                acc: number,
                item: any
              ) =>

                acc +

                Number(
                  item.score || 0
                ),

              0
            ) /

          (
            selectedCategory
              ?.businesses
              ?.length || 1
          )

        )

      }
    </h3>

  </div>





  {/* MULTI BRANCH */}

  <div
    className="
      bg-[#f8fafc]
      rounded-2xl
      p-5
    "
  >

    <p
      className="
        text-sm
        font-bold
        text-gray-500
      "
    >
      Multi Branch Shops
    </p>

    <h3
      className="
        text-[30px]
        font-black
        text-black
        mt-2
      "
    >
      {

        (
          selectedCategory
            ?.businesses || []
        )

          .filter(
            (item: any) =>

              Number(
                item.branch ||
                item.branches ||
                1
              ) > 1
          ).length

      }
    </h3>

  </div>

</div>





      {/* SHOP TABLE */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-8
        "
      >

        <div className="overflow-x-auto">

          <table
            className="
              w-full
              border-collapse
            "
          >

            <thead>

              <tr
                className="
                  bg-black
                  text-white
                "
              >

                <th className="p-4 text-left">
                  Shop
                </th>

                <th className="p-4 text-left">
                  Area
                </th>

                <th className="p-4 text-left">
                  Rating
                </th>

                <th className="p-4 text-left">
                  Branches
                </th>

                <th className="p-4 text-left">
                  Score
                </th>

              </tr>

            </thead>

            <tbody>

             {
  (
    selectedCategory
      ?.businesses || []
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
                        border-gray-200
                      "
                    >

                      <td className="p-4 font-bold text-black">
                        {shop.name}
                      </td>

                      <td className="p-4 text-black">
                        {shop.area}
                      </td>

                      <td className="p-4 text-black">
                        {shop.rating}
                      </td>

                      <td className="p-4 text-black">
                        {shop.branch}
                      </td>

                      <td className="p-4 font-bold text-green-600">
                        {shop.score}/100
                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

)}

</div>






    
  );
}