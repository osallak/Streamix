export default function MovieGrid() {
  return (
    <div className="grid grid-cols-6 gap-1 opacity-50">
      {/* Add movie poster images here */}
      {Array(24)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="aspect-[2/3] bg-gray-800">
            {/* Movie poster would go here */}
          </div>
        ))}
    </div>
  );
}
