export function windAlertColor(speed, units) {
    if (units === "imperial") {
        if (speed > 15) {
            return "danger";
        } else if (speed > 10) {
            return "warning";
        } else {
            return "success";
        }
    } else if (units === "metric") {
        if (speed > 6.7056) {
            return "danger";
        } else if (speed > 4.4704) {
            return "warning";
        } else {
            return "success";
        }
    }
}
