import { host_url_api } from "../../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: false,
  dataResponse: false,
  dataBannerById: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getAllBanner = createAsyncThunk(
  "banners/getAllBanner",
  async () => {
    const response = await axios.get(`${host_url_api}banner`);
    return response.data;
  }
);

export const getBannerById = createAsyncThunk(
  "banners/getBannerById",
  async (id) => {
    const response = await axios.get(`${host_url_api}banner/${id}`);
    return response.data;
  }
);

export const createNewBanner = createAsyncThunk(
  "banners/createNewBanner",
  async (data) => {
    const response = await axios.post(`${host_url_api}banner`, data);
    return response.data;
  }
);

export const editBanner = createAsyncThunk(
  "banners/editBanner",
  async (data) => {
    const response = await axios.put(
      `${host_url_api}banner/${data.id}`,
      data.data
    );
    return response.data;
  }
);
export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (id) => {
    const response = await axios.delete(`${host_url_api}banner/${id}`);
    return response.data;
  }
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setDefaultIsSuccess: (state) => {
      state.isSuccess = false;
    },
    setDefaultDataResponse: (state) => {
      state.dataResponse = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBanner.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.data = false;
    });
    builder.addCase(getAllBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(getBannerById.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.dataBannerById = false;
    });
    builder.addCase(getBannerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataBannerById = action.payload;
    });
    builder.addCase(createNewBanner.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.dataResponse = false;
    });
    builder.addCase(createNewBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataResponse = action.payload;
    });
    builder.addCase(editBanner.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.dataResponse = false;
    });
    builder.addCase(editBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataResponse = action.payload;
    });
    builder.addCase(deleteBanner.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.dataResponse = false;
    });
    builder.addCase(deleteBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dataResponse = action.payload;
    });
  },
});
export const { setDefaultIsSuccess, setDefaultDataResponse } =
  bannerSlice.actions;
export default bannerSlice.reducer;
