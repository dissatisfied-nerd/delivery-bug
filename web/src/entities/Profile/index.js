// import { getProfileFirstName } from "./model/selectors/getProfleData";
// import { getProfileLastName } from "./model/selectors/getProfleData";
// import { getProfileEmail } from "./model/selectors/getProfleData";
// import { getProfileCity } from "./model/selectors/getProfleData";
// import { getProfileStreet } from "./model/selectors/getProfleData";
// import { getProfileBuilding } from "./model/selectors/getProfleData";
// import { getProfileEntrance } from "./model/selectors/getProfleData";
// import { getProfileFloor } from "./model/selectors/getProfleData";
// import { getProfileAparts } from "./model/selectors/getProfleData";
// import { getProfilePassword } from "./model/selectors/getProfleData";
// import { getProfileType } from "./model/selectors/getProfleData";
import { getProfileIsAuth } from "./model/selectors/getProfileData";
import { getProfileOrders } from "./model/selectors/getProfileData";

import { profileActions } from "./model/slice/ProfileSlice";
import { profileReducer } from "./model/slice/ProfileSlice";
import { getProfileData } from "./model/selectors/getProfileData";

import { ProfileCard } from "./ui/ProfileCard";

// export {
//     getProfileFirstName,
//     getProfileLastName,
//     getProfileEmail,
//     getProfileCity,
//     getProfileStreet,
//     getProfileBuilding,
//     getProfileEntrance,
//     getProfileFloor,
//     getProfileAparts,
//     getProfilePassword,
//     getProfileType,
//     getProfileOrders,
// };

export {profileReducer,
    profileActions,
    getProfileData,
    getProfileOrders,
    getProfileIsAuth,
    ProfileCard,
}