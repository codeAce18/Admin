
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showSuccessMessage = (message) => {
    toast.success(message, {
        position: "top-center",
    });
}

export const showFailedMessage = (message) => {
    toast.error(message, {
        position: "top-center",
    });
    // console.log(message);

}

export const showWariningMessage = (message) => {
    toast.warning(message, {
        position: "top-center",
    });
}
export const showInfoMessage = (message) => {
    toast.info(message, {
        position: "top-center",
    });
}

export function timeAgo(utcDateString) {
    const now = new Date();
    const pastDate = new Date(utcDateString);
    const seconds = Math.floor((now - pastDate) / 1000); // Calculate difference in seconds

    let interval = Math.floor(seconds / 31536000); // Seconds in a year
    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000); // Seconds in a month
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400); // Seconds in a day
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600); // Seconds in an hour
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60); // Seconds in a minute
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`; // Less than a minute
}



