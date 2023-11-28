export const getProfileFirstName = (state) =>
    state.profile.data.firstName || "";
export const getProfileLastName = (state) => state.profile.data.lastName || "";
export const getProfileEmail = (state) => state.profile.data.email || "";
export const getProfileCity = (state) => state.profile.data.city || "";
export const getProfileStreet = (state) => state.profile.data.street || "";
export const getProfileBuilding = (state) => state.profile.data.building || "";
export const getProfileEntrance = (state) => state.profile.data.entrance || "";
export const getProfileFloor = (state) => state.profile.data.floor || "";
export const getProfileAparts = (state) => state.profile.data.aparts || "";
export const getProfilePassword = (state) => state.profile.data.password || "";
export const getProfileType = (state) => state.profile.data.type || "client";
export const getProfileIsAuth = (state) => state.profile.isAuth;
