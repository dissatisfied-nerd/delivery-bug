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
export const getCourierOrders = (state) => state.courier.orders;
export const getCourierData = (state) => state.courier.data;
export const getCourierId = (state) => state.courier.courier_id || "";
export const getCourierError = (state) => state.courier.error || "";
