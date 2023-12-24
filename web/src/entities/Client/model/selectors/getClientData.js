// export const getProfileFirstName = (state) =>
//     state.profile.data.firstName || "";
// export const getProfileLastName = (state) => state.profile.data.last_name || "";
// export const getProfileEmail = (state) => state.profile.data.email || "";
// export const getProfileCity = (state) => state.profile.data.city || "";
// export const getProfileStreet = (state) => state.profile.data.street || "";
// export const getProfileBuilding = (state) => state.profile.data.building || "";
// export const getProfileEntrance = (state) => state.profile.data.entrance || "";
// export const getProfileFloor = (state) => state.profile.data.floor || "";
// export const getProfileAparts = (state) => state.profile.data.apartment || "";
// export const getProfilePassword = (state) => state.profile.data.password || "";
// export const getProfileType = (state) => state.profile.data.type || "client";
export const getClientOrders = (state) => state.client.orders;
export const getClientData = (state) => state.client.data;
export const getClientId = (state) => state.client.client_id || "";
export const getClientError = (state) => state.client.error || "";
