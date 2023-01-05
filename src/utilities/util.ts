export const threeDot = (text: string, length: number = 10) => {

    try {
        return text.length > length ? text.substring(0, length) + '...' : text
    } catch (error) {
        console.log(error);
    }
    return text
}

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export function timeSince(date: Date) {

    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    var interval = seconds / 31536000;

    interval = seconds / 86400;
    if (interval > 2) {
        return formatDate(date);
    }
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return "just now";
}