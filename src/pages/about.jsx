import { ChefHat, Heart, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { theme } = useTheme();

  // Dynamic UI colors
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const sectionBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const headingClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const paragraphClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-700" : "bg-white";
  const overlayText = theme === "dark" ? "text-gray-200" : "text-gray-800";

  return (
    <div className={`min-h-screen ${bgClass}`}>
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-red-400 to-orange-400 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Restaurant interior"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6 leading-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Where passion for food meets culinary excellence, creating unforgettable dining experiences since 2010.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20`}>
        
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className={`text-4xl font-bold mb-6 ${headingClass}`}>
              A Journey of Flavor
            </h2>

            <p className={`text-lg leading-relaxed mb-6 ${paragraphClass}`}>
              What began as a small family dream has blossomed into a culinary destination where tradition meets innovation...
            </p>

            <p className={`text-lg leading-relaxed mb-6 ${paragraphClass}`}>
              Every dish we serve tells a story. From signature recipes passed down through generations to innovative creations...
            </p>

            <p className={`text-lg leading-relaxed ${paragraphClass}`}>
              Today, we're proud to be a gathering place for our community, celebrating life’s moments with exceptional food.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Chef preparing food"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Icons Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {[
            { Icon: ChefHat, title: "Expert Chefs" },
            { Icon: Heart, title: "Made with Love" },
            { Icon: Award, title: "Award Winning" }
          ].map(({ Icon, title }) => (
            <div key={title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <Icon className="w-8 h-8 text-red-600" />
              </div>

              <h3 className={`text-2xl font-bold mb-4 ${headingClass}`}>{title}</h3>
              <p className={`${paragraphClass} leading-relaxed`}>
                {
                  title === "Expert Chefs" ? "Our talented culinary team brings decades of experience..." :
                  title === "Made with Love" ? "Every ingredient is carefully selected and prepared..." :
                  "Recognized for culinary excellence and outstanding service..."
                }
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy Section */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl mb-32 ${sectionBgClass}`}>
          <div className="grid md:grid-cols-2">
            
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <h2 className={`text-4xl font-bold mb-6 ${headingClass}`}>
                Our Philosophy
              </h2>

              <p className={`text-lg leading-relaxed mb-6 ${paragraphClass}`}>
                Dining is more than just eating — it's an experience that creates lasting memories.
              </p>

              <ul className="space-y-4">
                {[
                  "Fresh, locally-sourced ingredients supporting our community",
                  "Sustainable practices that honor our environment",
                  "Authentic flavors with a modern creative touch",
                  "Warm hospitality that makes everyone feel welcome"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-4"></div>
                    <p className={paragraphClass}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-full min-h-[400px]">
              <img
                src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fresh ingredients"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
