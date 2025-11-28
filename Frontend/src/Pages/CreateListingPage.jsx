// src/pages/CreateListingPage.jsx
import React, { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const CreateListingPage = ({ setPage }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    price: "",
    listingType: "sale",
    propertyType: "house",
    bedrooms: 1,
    bathrooms: 1,
    size: 500,
    city: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.name === "price" ||
      e.target.name === "bedrooms" ||
      e.target.name === "bathrooms" ||
      e.target.name === "size"
        ? Number(e.target.value)
        : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6">
        Create New Listing – {user?.username}
      </h2>
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          Listing created!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="p-3 border rounded-lg md:col-span-2"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          required
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <select
          name="listingType"
          onChange={handleChange}
          className="p-3 border rounded-lg"
        >
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <input
          name="city"
          placeholder="City"
          required
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <input
          name="country"
          placeholder="Country"
          required
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          min="0"
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          min="0"
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <input
          name="size"
          type="number"
          placeholder="Size (sqft)"
          onChange={handleChange}
          className="p-3 border rounded-lg md:col-span-2"
        />

        <div className="md:col-span-2">
          <Button
            type="submit"
            loading={loading}
            primary={true}
            className="w-full"
          >
            Create Listing
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;
