import { useTheme } from "../context/ThemeContext";
import "../App.css/";
export default function CategoryUiCard({ item }) {
  const { theme } = useTheme();

  // Dynamic classes
  const bgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const shadowClass = theme === "dark" ? "shadow-gray-700" : "shadow-lg";

  return (
    <div
      className={`rounded-2xl overflow-hidden ${bgClass} ${shadowClass} hover:shadow-xl transition-shadow group cursor-pointer`}
   style={{animation: "fadeUp 0.6s ease",
      animationDelay: "0.3s",
      opacity: 0,
      animationFillMode: "forwards"}} >
      <div className="relative h-64 overflow-hidden">
        <img
          src={`${item.imgUrl}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${headingClass}`}>{item.name}</h3>
        <p className={`mb-4 ${textClass}`}>{item.description}</p>
        <div className="flex items-center justify-between">{/* optional actions */}</div>
      </div>
    </div>
  );
}
