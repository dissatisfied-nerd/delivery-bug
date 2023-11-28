import { getProfileFirstName } from "./model/selectors/getProfleData";
import { getProfileLastName } from "./model/selectors/getProfleData";
import { getProfileEmail } from "./model/selectors/getProfleData";
import { getProfileCity } from "./model/selectors/getProfleData";
import { getProfileStreet } from "./model/selectors/getProfleData";
import { getProfileBuilding } from "./model/selectors/getProfleData";
import { getProfileEntrance } from "./model/selectors/getProfleData";
import { getProfileFloor } from "./model/selectors/getProfleData";
import { getProfileAparts } from "./model/selectors/getProfleData";
import { getProfilePassword } from "./model/selectors/getProfleData";
import { getProfileType } from "./model/selectors/getProfleData";
import { getProfileIsAuth } from "./model/selectors/getProfleData";

import { profileActions } from "./model/slice/ProfileSlice";
import { profileReducer } from "./model/slice/ProfileSlice";

import { ProfileCard } from "./ui/ProfileCard";

export {
    getProfileFirstName,
    getProfileLastName,
    getProfileEmail,
    getProfileCity,
    getProfileStreet,
    getProfileBuilding,
    getProfileEntrance,
    getProfileFloor,
    getProfileAparts,
    getProfilePassword,
    getProfileType,
    profileActions,
    profileReducer,
    ProfileCard,
    getProfileIsAuth,
};
