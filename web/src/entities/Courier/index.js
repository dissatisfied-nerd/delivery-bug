// import { getCourierFirstName } from "./model/selectors/getProfleData";
// import { getCourierLastName } from "./model/selectors/getProfleData";
// import { getCourierEmail } from "./model/selectors/getProfleData";
// import { getCourierCity } from "./model/selectors/getProfleData";
// import { getCourierStreet } from "./model/selectors/getProfleData";
// import { getCourierBuilding } from "./model/selectors/getProfleData";
// import { getCourierEntrance } from "./model/selectors/getProfleData";
// import { getCourierFloor } from "./model/selectors/getProfleData";
// import { getCourierAparts } from "./model/selectors/getProfleData";
// import { getCourierPassword } from "./model/selectors/getProfleData";
// import { getCourierType } from "./model/selectors/getProfleData";
import { getCourierOrders } from "./model/selectors/getCourierData";

import { courierActions } from "./model/slice/CourierSlice";
import { courierReducer } from "./model/slice/CourierSlice";
import { getCourierData } from "./model/selectors/getCourierData";
import { getCourierId } from "./model/selectors/getCourierData";
import { fetchCourierData } from "./model/services/fetchCourierData/fetchCourierData";
import { fetchCourierOrders } from "./model/services/fetchCourierOrders/fetchCourierOrders";

// export {
//     getCourierFirstName,
//     getCourierLastName,
//     getCourierEmail,
//     getCourierCity,
//     getCourierStreet,
//     getCourierBuilding,
//     getCourierEntrance,
//     getCourierFloor,
//     getCourierAparts,
//     getCourierPassword,
//     getCourierType,
//     getCourierOrders,
// };

export {
    courierReducer,
    courierActions,
    getCourierData,
    getCourierOrders,
    getCourierId,
    fetchCourierData,
    fetchCourierOrders,
};
