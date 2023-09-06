import { createSlice, configureStore } from "@reduxjs/toolkit";

const favoritesState = {
  favorites: [],
};

const fromState = {
  fromLocation: null,
  isFromChanged: false,
  fromId: null,
};

const toState = {
  toLocation: null,
  isToChanged: false,
  toId: null,
};

const bookingState = {
  location: [],
  isLocationChanged: false,
  properties: [],
};

const rentalState = {
  location: [],
  isLocationChanged: false,
  cars: [],
};

const fromFlightState = {
  fromLocation: null,
  isFromChanged: false,
  fromId: null,
};

const toFlightState = {
  toLocation: null,
  isToChanged: false,
  toId: null,
};

const tripsState = {
  trips: [],
};

const tripsSlice = createSlice({
  name: "trips",
  initialState: tripsState,
  reducers: {
    uploadTrips(state, action) {
      state.trips = action.payload.trips;
    },
  },
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: favoritesState,
  reducers: {
    uploadFavorites(state, action) {
      state.favorites = action.payload.favorites;
    },
    addToFavorites(state, action) {
      state.favorites.push(action.payload.favorite);
    },
    removeFromFavorites(state, action) {
      state.favorites.splice(action.payload.index, 1);
    },
  },
});

const bookingSlice = createSlice({
  name: "booking",
  initialState: bookingState,
  reducers: {
    uploadLocation(state, action) {
      state.location = action.payload.location;
      state.isLocationChanged = true;
    },
    uploadProperties(state, action) {
      state.properties = action.payload.properties;
    },
    uploadLocationChanged(state, action) {
      state.isLocationChanged = action.payload.isLocationChanged;
    },
  },
});

const rentalSlice = createSlice({
  name: "rental",
  initialState: rentalState,
  reducers: {
    uploadLocation(state, action) {
      state.location = action.payload.location;
      state.isLocationChanged = true;
    },
    uploadCars(state, action) {
      state.cars = action.payload.cars;
    },
    uploadLocationChanged(state, action) {
      state.isLocationChanged = action.payload.isLocationChanged;
    },
  },
});

const flightsState = {
  flights: [],
};

const flightsSlice = createSlice({
  name: "flights",
  initialState: flightsState,
  reducers: {
    uploadFlights(state, action) {
      state.flights = action.payload.flights;
    },
  },
});

const fromFlightSlice = createSlice({
  name: "fromFlightLocation",
  initialState: fromFlightState,
  reducers: {
    uploadLocation(state, action) {
      state.fromLocation = action.payload.location;
      state.isFromChanged = true;
    },
    uploadCityId(state, action) {
      state.fromId = action.payload.id;
    },
    uploadLocationChanged(state, action) {
      state.isFromChanged = action.payload.isFromChanged;
    },
  },
});

const fromSlice = createSlice({
  name: "fromLocation",
  initialState: fromState,
  reducers: {
    uploadLocation(state, action) {
      state.fromLocation = action.payload.location;
      state.isFromChanged = true;
    },
    uploadCityId(state, action) {
      state.fromId = action.payload.id;
    },
    uploadLocationChanged(state, action) {
      state.isFromChanged = action.payload.isFromChanged;
    },
  },
});

const toFlightSlice = createSlice({
  name: "toFlightLocation",
  initialState: toFlightState,
  reducers: {
    uploadLocation(state, action) {
      state.toLocation = action.payload.location;
      state.isToChanged = true;
    },
    uploadCityId(state, action) {
      state.toId = action.payload.id;
    },
    uploadLocationChanged(state, action) {
      state.isToChanged = action.payload.isToChanged;
    },
  },
});

const toSlice = createSlice({
  name: "toLocation",
  initialState: toState,
  reducers: {
    uploadLocation(state, action) {
      state.toLocation = action.payload.location;
      state.isToChanged = true;
    },
    uploadCityId(state, action) {
      state.toId = action.payload.id;
    },
    uploadLocationChanged(state, action) {
      state.isToChanged = action.payload.isToChanged;
    },
  },
});

const store = configureStore({
  reducer: {
    fromLoc: fromSlice.reducer,
    toLoc: toSlice.reducer,
    fromFlightLoc: fromFlightSlice.reducer,
    toFlightLoc: toFlightSlice.reducer,
    trips: tripsSlice.reducer,
    flights: flightsSlice.reducer,
    booking: bookingSlice.reducer,
    rental: rentalSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

export const toLocationActions = toSlice.actions;
export const fromLocationActions = fromSlice.actions;
export const fromCoordinates = fromSlice.getInitialState.location;
export const toCoordinates = toSlice.getInitialState.location;
export const fromId = fromSlice.getInitialState.id;
export const toId = toSlice.getInitialState.id;
export const toFlightLocationActions = toFlightSlice.actions;
export const fromFlightLocationActions = fromFlightSlice.actions;
export const fromFlightCoordinates = fromFlightSlice.getInitialState.location;
export const toFlightCoordinates = toFlightSlice.getInitialState.location;
export const fromFlightId = fromFlightSlice.getInitialState.id;
export const toFlightId = toFlightSlice.getInitialState.id;
export const tripsActions = tripsSlice.actions;
export const flightsActions = flightsSlice.actions;
export const bookingActions = bookingSlice.actions;
export const bookingLocation = bookingSlice.getInitialState.location;
export const bookingIsChanged = bookingSlice.getInitialState.isLocationChanged;
export const bookingProperties = bookingSlice.getInitialState.properties;
export const rentalActions = rentalSlice.actions;
export const rentalLocation = rentalSlice.getInitialState.location;
export const rentalCars = rentalSlice.getInitialState.cars;
export const rentalIsChanged = rentalSlice.getInitialState.isLocationChanged;
export const favoritesActions = favoritesSlice.actions;

export default store;
