import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryUiCard from "../components/CategoryUiCard";
import { useTheme } from "../context/ThemeContext";

export default function CategoryList() {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get("https://flavia-backend.onrender.com/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    const skeletonBg = theme === "dark" ? "#374151" : "#e5e7eb"; // gray-700 / gray-200
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ bgcolor: skeletonBg }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to="/Menu"
          state={{ category: cat.name }}
          className="no-underline"
        >
          <CategoryUiCard item={cat} />
        </Link>
      ))}
    </div>
  );
}
