import Navbar from "@/components/common/Navbar";
import { Footer } from "@/components/logincomponents/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";  // Add this import

const Solutions = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Crop Prediction",
      description:
        "Leverage AI-powered predictions to analyze climate data, soil conditions, and crop patterns, helping you make informed farming decisions.",
      image: "https://dmtyylqvwgyxw.cloudfront.net/instances/132/uploads/images/custom_image/image/56954/wide_blob?v=1676907588", // Replace with an actual image
      link: "/predictions",
    },
    {
      id: 2,
      title: "Recommendations",
      description:
        "Get actionable recommendations for improving yields, optimizing resources, and mitigating potential risks based on real-time data.",
      image: "https://www.leafenvy.co.uk/cdn/shop/articles/top-5-best-gifts-for-plant-lovers-841487_x1024.jpg?v=1693062867", // Replace with an actual image
      link: "/recommendation",
    },
    {
      id: 3,
      title: "Offspring Techniques",
      description:
        "Explore modern offspring management techniques to ensure sustainable and high-quality yields for future generations.",
      image: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2023/opinion/leadShutterstock1769145530-1685549421.jpg&w=900&height=601", // Replace with an actual image
      link: "/offspring",
    },
    {
      id: 4,
      title: "Health Problems Detections",
      description:
        "Explore modern offspring management techniques to ensure sustainable and high-quality yields for future generations.",
      image: "data:image/png;base64,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", // Replace with an actual image
      link: "/pestdetection",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center py-12 px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-green-700">
          Our Solutions
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Empowering farmers with cutting-edge AI tools for better decision-making,
          improved yields, and sustainable practices.
        </p>
      </header>

      {/* Services Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-600">
                  {service.title}
                </h2>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <button
                  onClick={() => navigate(service.link)}
                  className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Outlet for Nested Routes */}
      <Outlet />

      <Footer />
    </div>
  );
};

export default Solutions;
