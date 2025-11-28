// src/pages/PropertyDetailsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Loader2,
  MapPin,
  Bed,
  Bath,
  HomeIcon,
  SquareGanttChart,
  Phone,
  MessageSquare,
  User,
} from "lucide-react";
import Button from "../components/Button";
import DetailBox from "../components/DetailBox";
import { MockProperties } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

const PropertyDetailsPage = ({ propertyId, setPage }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      const found = MockProperties.find((p) => p._id === propertyId);
      if (found) {
        setProperty({
          ...found,
          description: `${found.title} is a beautiful property with modern amenities... (full description)`,
          features: ["Pool", "Gym", "Parking", "Pet Friendly", "Balcony"],
          agent: {
            name: "Sarah Johnson",
            phone: "555-1234",
            email: "sarah@realtypro.com",
          },
        });
      }
      setLoading(false);
    }, 600);
  }, [propertyId]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  if (!property)
    return (
      <div className="text-center py-20 text-red-600">Property not found</div>
    );

  const price =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 3,
    }).format(property.price) + (property.listingType === "rent" ? "/mo" : "");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{property.title}</h1>
        <Button onClick={() => setPage("listings")} primary={false}>
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-96 object-cover rounded-xl shadow-xl"
          />
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between text-3xl font-bold text-blue-600">
              {price}
            </div>
            <p className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" /> {property.location.city},{" "}
              {property.location.country}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">Key Details</h3>
            <div className="grid grid-cols-4 gap-4">
              <DetailBox
                icon={Bed}
                label="Beds"
                value={property.details.bedrooms}
              />
              <DetailBox
                icon={Bath}
                label="Baths"
                value={property.details.bathrooms}
              />
              <DetailBox
                icon={SquareGanttChart}
                label="Size"
                value={`${property.details.size} sqft`}
              />
              <DetailBox
                icon={HomeIcon}
                label="Type"
                value={property.propertyType}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl h-fit sticky top-20">
          <h3 className="text-2xl font-bold flex items-center mb-4">
            <User className="w-6 h-6 mr-2" /> Contact Agent
          </h3>
          {isAuthenticated ? (
            <>
              <p className="font-semibold">{property.agent.name}</p>
              <p className="flex items-center text-blue-600">
                <Phone className="w-5 h-5 mr-2" /> {property.agent.phone}
              </p>
              <p className="flex items-center text-blue-600">
                <MessageSquare className="w-5 h-5 mr-2" />{" "}
                {property.agent.email}
              </p>
              <Button
                primary={true}
                icon={MessageSquare}
                className="w-full mt-4"
              >
                Send Message
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-4">Log in to contact the agent</p>
              <Button
                onClick={() => setPage("login")}
                primary={true}
                className="w-full"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
