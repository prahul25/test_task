import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (locations, { getState }) => {
    // console.log(locations,"location")
    try {
      const state = getState().todo;
      const weatherData = [...state];
// console.log(weatherData,"weahter dataaaa")
      // Fetch weather only for new locations
      const newLocations = weatherData.filter((data) => data.location);
      // console.log(newLocations, "nre location")
    //   if (newLocations.length === 0) return weatherData;
      // Fetch data for new locations
      const responses = await Promise.all(
        newLocations.map((data) =>
          fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${data.location}&aqi=no`
          ).then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
        )
      );
// console.log(responses,"response")
     
      responses.forEach((data, index) => {
        // console.log(weatherData[index].location)
        if(weatherData[index].location === data.location.name.toLowerCase()){
            const additionalData ={ temp_c:data.current.temp_c,temp_f:data.current.temp_f,conditionText:data.current.condition.text,conditionIcon:data.current.condition.icon}
            // console.log({...weatherData[index], ...temperature},"all data")
            weatherData[index] = {...weatherData[index], ...additionalData}
        }
      });
// console.log(weatherData, "weather response")
      return weatherData;
    } catch (error) {
      console.error("Weather API Error:", error);
      throw new Error("Failed to fetch weather");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
