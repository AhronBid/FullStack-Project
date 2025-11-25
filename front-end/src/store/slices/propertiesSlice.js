import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { propertiesAPI } from "../../utils/api.js";
import { getPropertyImage } from "../../utils/propertyImages.js";

const initialState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch all properties
 */
export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const properties = await propertiesAPI.getAll();
      return properties;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch properties');
    }
  }
);

/**
 * Async thunk to create a new property
 */
export const createProperty = createAsyncThunk(
  'properties/create',
  async (propertyData, { rejectWithValue }) => {
    try {
      const property = await propertiesAPI.create(propertyData);
      return property;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create property');
    }
  }
);

/**
 * Async thunk to update a property
 */
export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const property = await propertiesAPI.update(id, propertyData);
      return property;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update property');
    }
  }
);

/**
 * Async thunk to delete a property
 */
export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id, { rejectWithValue }) => {
    try {
      await propertiesAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete property');
    }
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    // Legacy actions for backward compatibility (will work with local state if API fails)
    addProperty: (state, action) => {
      state.properties.push({
        id: Date.now(),
        ...action.payload,
        status: action.payload.status || "available",
        createdAt: new Date().toISOString(),
      });
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch properties cases
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Fetched properties from backend:', action.payload); // Debug
        // Transform backend data to match frontend format
        state.properties = action.payload.map(prop => {
          const transformed = {
            id: prop._id ? prop._id.toString() : prop.id,
            title: prop.title,
            address: prop.title.split(',')[0] || prop.title, // Extract address from title
            city: prop.location ? prop.location.split(',')[0] : 'Unknown',
            propertyType: prop.propertyType || 'apartment', // Get from backend
            size: prop.size !== null && prop.size !== undefined ? Number(prop.size) : 0, // Get from backend
            rooms: prop.rooms !== null && prop.rooms !== undefined ? Number(prop.rooms) : 0, // Get from backend
            price: prop.price,
            description: prop.description || '',
            status: prop.status || 'available',
            image: prop.image || getPropertyImage(prop.propertyType || 'apartment', prop.id), // Use provided image or default based on type
            createdAt: prop.createdAt || new Date().toISOString(),
          };
          console.log('Transformed property:', transformed, 'Original size:', prop.size, 'Original rooms:', prop.rooms); // Debug
          return transformed;
        });
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create property cases
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Backend returned property:', action.payload); // Debug log
        console.log('Backend returned propertyType:', action.payload.propertyType); // Debug log
        // Transform backend response to match frontend format
        const newProp = {
          id: action.payload._id ? action.payload._id.toString() : action.payload.id,
          title: action.payload.title,
          address: action.payload.title.split(',')[0] || action.payload.title,
          city: action.payload.location ? action.payload.location.split(',')[0] : 'Unknown',
          propertyType: action.payload.propertyType || 'apartment',
          size: action.payload.size !== null && action.payload.size !== undefined ? Number(action.payload.size) : 0,
          rooms: action.payload.rooms !== null && action.payload.rooms !== undefined ? Number(action.payload.rooms) : 0,
          price: action.payload.price,
          description: action.payload.description || '',
          status: action.payload.status || 'available',
          image: action.payload.image || getPropertyImage(action.payload.propertyType || 'apartment', action.payload._id ? action.payload._id.toString() : action.payload.id),
          createdAt: action.payload.createdAt || new Date().toISOString(),
        };
        console.log('Transformed property:', newProp); // Debug log
        state.properties.push(newProp);
        state.error = null;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update property cases
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const payloadId = action.payload._id ? action.payload._id.toString() : action.payload.id;
        const index = state.properties.findIndex(
          (p) => p.id === payloadId
        );
        if (index !== -1) {
          // Transform backend response to match frontend format
          const updatedProp = {
            ...state.properties[index],
            id: payloadId,
            title: action.payload.title,
            address: action.payload.title.split(',')[0] || action.payload.title,
            city: action.payload.location ? action.payload.location.split(',')[0] : state.properties[index].city,
            price: action.payload.price,
            description: action.payload.description || '',
            status: action.payload.status || 'available',
            propertyType: action.payload.propertyType !== undefined ? action.payload.propertyType : state.properties[index].propertyType,
            image: action.payload.image !== undefined ? action.payload.image : (state.properties[index].image || getPropertyImage(action.payload.propertyType || state.properties[index].propertyType, action.payload.id)),
            size: action.payload.size !== undefined ? action.payload.size : state.properties[index].size,
            rooms: action.payload.rooms !== undefined ? action.payload.rooms : state.properties[index].rooms,
            createdAt: action.payload.createdAt || state.properties[index].createdAt,
            updatedAt: action.payload.updatedAt,
          };
          state.properties[index] = updatedProp;
        }
        state.error = null;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete property cases
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is the ID string from the deleteProperty thunk
        const deletedId = typeof action.payload === 'string' ? action.payload : (action.payload._id ? action.payload._id.toString() : action.payload);
        state.properties = state.properties.filter(
          (p) => p.id !== deletedId
        );
        state.error = null;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addProperty,
  togglePropertyStatus,
  selectProperty,
  clearError,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
