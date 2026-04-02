import { Box, Container, Typography } from "@mui/material";
import CategoryList from "./CategoryList";
import NavBar from "../components/Nav";
import "../App.css";
import { HeroSection } from "../components/HeroSection";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  // Dynamic classes based on theme
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const headingClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Content */}
      <div className={`${bgClass} py-16 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${headingClass}`}>
              FOOD CATEGORIES
            </h2>
            <p className={`text-lg ${textClass}`}>
              you can click to any category to see its menu
            </p>
          </div>

          <CategoryList />
        </div>
      </div>
    </>
  );
}
