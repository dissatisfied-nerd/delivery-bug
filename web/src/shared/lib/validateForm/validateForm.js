export const validateForm = (data) => {
    if (!Object.keys(data).length) {
        return "Нет данных";
    }
    for (const [key, value] of Object.entries(data)) {
        if (!value) {
            return "Все поля должны быть заполнены";
        }
        if (
            key === "login" &&
            !value
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            return "Некорректный email";
        }
        if (key === "password" && value.length < 6) {
            return "Длина пароля должна быть от 6 символов";
        }
        if (key === "price" && Number.parseFloat(value) === 0) {
            return "Цена не может быть 0";
        }
        if (key === "weight" && Number.parseFloat(value) === 0) {
            return "Вес не может быть 0";
        }
    }
    return "";
};
