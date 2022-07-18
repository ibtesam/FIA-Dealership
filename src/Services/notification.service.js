import { notification } from "antd";

const notificationService = {
    success,
    error,
    warning,
    info
};

function success(message = "", description = "", color) {
    notification.success({
        message,
        description,
        ...(color && { className: "success-toaster" })
    });
}

function error(message = "", description = "", color) {
    notification.error({
        message,
        description,
        ...(color && { className: "fail-toaster" })
    });
}

function warning(message = "", description = "") {
    notification.warning({
        message,
        description
    });
}

function info(message = "", description = "") {
    notification.info({
        message,
        description
    });
}

export default notificationService;
