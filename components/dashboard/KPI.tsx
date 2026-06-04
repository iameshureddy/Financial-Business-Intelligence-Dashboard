"use client";

import {
  Building2,
  MapPin,
  Trophy,
  Star,
  TrendingUp,
} from "lucide-react";

export default function KPI({ data = [] }: any) {
  const safe = Array.isArray(data) ? data : [];

  const total = safe.length;

  // =========================
  // BEST AREA (BY AVG RATING)
  // =========================
  const ratingMap: any = {};

  safe.forEach((d) => {
    if (!d.area) return;

    if (!ratingMap[d.area]) {
      ratingMap[d.area] = { total: 0, count: 0 };
    }

    ratingMap[d.area].total += d.rating || 0;
    ratingMap[d.area].count += 1;
  });

  const bestArea =
    Object.entries(ratingMap)
      .map(([area, val]: any) => ({
        area,
        avg: val.total / val.count,
      }))
      .sort((a, b) => b.avg - a.avg)[0]?.area || "-";

  // =========================
  // KPI CALCULATIONS
  // =========================
  const target = safe.filter((d) => d.score >= 80).length;
  const topRated = safe.filter((d) => d.rating >= 4.5).length;
  const growing = safe.filter((d) => d.branch >= 3).length;

  // ⭐ NEW (clear meaning)
  const highQualitySingle = safe.filter(
    (d) => d.rating >= 4 && d.branch === 1
  ).length;

  const percent = (v: number) =>
    total ? `${Math.round((v / total) * 100)}%` : "0%";

  // =========================
  // KPI LIST
  // =========================
  const kpis = [
    {
      title: "Total Shops",
      value: total,
      percent: "100%",
      icon: Building2,
      color: "text-indigo-600",
    },
    {
      title: "Best Area (by Rating)",
      value: bestArea,
      percent: "",
      icon: MapPin,
      color: "text-purple-600",
    },
    {
      title: "Target Shops (80+ Score)",
      value: target,
      percent: percent(target),
      icon: Trophy,
      color: "text-orange-500",
    },
    {
      title: "Top Rated Shops (4.5+)",
      value: topRated,
      percent: percent(topRated),
      icon: Star,
      color: "text-green-600",
    },
    {
      title: "Growing Brands (3+ Branches)",
      value: growing,
      percent: percent(growing),
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "High Quality Single Stores",
      value: highQualitySingle,
      percent: percent(highQualitySingle),
      icon: TrendingUp,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="w-full">

      {/* 📱 MOBILE → SCROLL */}
      <div className="flex gap-4 overflow-x-auto pb-2 md:hidden">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;

          return (
            <div
              key={i}
              className="
                bg-white rounded-xl
                px-4 py-4
                min-w-[180px]
                shadow-sm
                border-t-4 border-indigo-500
                flex-shrink-0
              "
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900">
                  {kpi.title}
                </p>
                <Icon size={22} className={kpi.color} />
              </div>

              <div className="mt-3 flex justify-between items-end">
                <span className="text-xl font-bold text-black">
                  {kpi.value}
                </span>

                {kpi.percent && (
                  <span className={`text-sm font-bold ${kpi.color}`}>
                    {kpi.percent}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 💻 DESKTOP → GRID */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;

          return (
            <div
              key={i}
              className="
                bg-white rounded-xl
                px-4 py-4
                shadow-sm
                border-t-4 border-indigo-500
              "
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900">
                  {kpi.title}
                </p>
                <Icon size={22} className={kpi.color} />
              </div>

              <div className="mt-3 flex justify-between items-end">
                <span className="text-xl font-bold text-black">
                  {kpi.value}
                </span>

                {kpi.percent && (
                  <span className={`text-sm font-bold ${kpi.color}`}>
                    {kpi.percent}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}