import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [
    {
      id: 1,
      address: "Ben Yehuda Street 15",
      city: "Tel Aviv",
      propertyType: "apartment",
      size: 85,
      rooms: 3,
      price: 2800000,
      description:
        "Beautiful 3-room apartment in the heart of Tel Aviv. Recently renovated with modern finishes, large balcony with city views. Perfect location near beach and city center.",
      status: "available",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      createdAt: "2024-01-15T10:00:00.000Z",
    },
    {
      id: 2,
      address: "Herzl Street 42",
      city: "Jerusalem",
      propertyType: "house",
      size: 180,
      rooms: 5,
      price: 4500000,
      description:
        "Spacious family home in Jerusalem with beautiful garden, renovated kitchen, and large living areas. Ideal for families seeking a peaceful neighborhood with excellent schools nearby.",
      status: "available",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      createdAt: "2024-02-20T14:30:00.000Z",
    },
    {
      id: 3,
      address: "HaTayelet",
      city: "Herzliya",
      propertyType: "villa",
      size: 320,
      rooms: 6,
      price: 8500000,
      description:
        "Luxury villa with stunning sea views in prestigious Herzliya. Features include infinity pool, private beach access, premium finishes throughout, and expansive outdoor entertaining spaces.",
      status: "available",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      createdAt: "2024-03-10T09:15:00.000Z",
    },
  ],
  selectedProperty: null,
  loading: false,
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addProperty: (state, action) => {
      state.properties.push({
        id: Date.now(),
        ...action.payload,
        status: action.payload.status || "available",
        createdAt: new Date().toISOString(),
      });
    },
    updateProperty: (state, action) => {
      const index = state.properties.findIndex((property) => property.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = { ...state.properties[index], ...action.payload };
      }
    },
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter((property) => property.id !== action.payload);
    },
    togglePropertyStatus: (state, action) => {
      const index = state.properties.findIndex((property) => property.id === action.payload);
      if (index !== -1) {
        state.properties[index].status = state.properties[index].status === "sold" ? "available" : "sold";
      }
    },
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addProperty,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
  selectProperty,
  setLoading,
  setError,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
