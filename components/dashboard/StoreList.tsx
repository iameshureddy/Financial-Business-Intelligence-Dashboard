export default function StoreList({ data }: any) {
  return (
    <div className="space-y-3">

      {data.map((item: any, i: number) => (
        <div
          key={i}
          className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-lg hover:shadow transition"
        >
          <div>
            <p className="font-semibold text-slate-800">
              {item.name}
            </p>
            <p className="text-sm text-slate-600">
              {item.category} • {item.area}
            </p>
          </div>

          <span className="text-yellow-500 font-bold">
            ⭐ {item.rating}
          </span>
        </div>
      ))}

    </div>
  );
}