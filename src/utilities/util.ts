import { ActivitiesActionEnum, AdminActivitiesActionEnum } from "./enums";

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



export const getColorByActionActivities = (action: ActivitiesActionEnum | AdminActivitiesActionEnum) => {
    let color = "rgb(15, 139, 253)"
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            color = "rgb(11, 209, 138)"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            color = "rgb(238, 229, 0)"
            break;
        case ActivitiesActionEnum.SEND_POST:
            color = "rgb(236, 77, 188)"
            break;
        case AdminActivitiesActionEnum.BAN_COMMENT:
            color = "rgb(11, 209, 138)"
            break;
        case AdminActivitiesActionEnum.BAN_CHAT:
            color = "rgb(238, 229, 0)"
            break;
        case AdminActivitiesActionEnum.BAN_POST:
            color = "rgb(236, 77, 188)"
            break;
    }
    return color
}

export const getIconByActionActivities = (action: ActivitiesActionEnum | AdminActivitiesActionEnum) => {
    let icon = "pi pi-refresh"
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            icon = "pi pi-comment"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            icon = "pi pi-comments"
            break;
        case ActivitiesActionEnum.SEND_POST:
            icon = "pi pi-book"
            break;
        case AdminActivitiesActionEnum.BAN_COMMENT:
            icon = "pi pi-comment"
            break;
        case AdminActivitiesActionEnum.BAN_CHAT:
            icon = "pi pi-comments"
            break;
        case AdminActivitiesActionEnum.BAN_POST:
            icon = "pi pi-book"
            break;
    }
    return icon
}

export const getTitleByActionActivities = (action: ActivitiesActionEnum | AdminActivitiesActionEnum) => {
    let title = ""
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            title = "Sent a comment"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            title = "Sent a chat"
            break;
        case ActivitiesActionEnum.SEND_POST:
            title = "Created a post"
            break;
        case AdminActivitiesActionEnum.BAN_COMMENT:
            title = "Ban a comment"
            break;
        case AdminActivitiesActionEnum.BAN_CHAT:
            title = "Ban a chat"
            break;
        case AdminActivitiesActionEnum.BAN_POST:
            title = "Ban a post"
            break;
        case ActivitiesActionEnum.CREATE_ACCOUNT:
            title = "Signing up"
            break;
    }
    return title
}

export const getNameByActionActivities = (action: ActivitiesActionEnum | AdminActivitiesActionEnum) => {
    let title = ""
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            title = "Comment"
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            title = "Chat"
            break;
        case ActivitiesActionEnum.SEND_POST:
            title = "Post"
            break;
        case ActivitiesActionEnum.CREATE_ACCOUNT:
            title = "Create Account"
            break;
        case AdminActivitiesActionEnum.BAN_COMMENT:
            title = "Ban Comment"
            break;
        case AdminActivitiesActionEnum.BAN_CHAT:
            title = "Ban Chat"
            break;
        case AdminActivitiesActionEnum.BAN_POST:
            title = "Ban Post"
            break;

    }
    return title
}

export const readirectByActionActivities = (action: ActivitiesActionEnum | AdminActivitiesActionEnum, id: string) => {
    let url = '#'
    switch (action) {
        case ActivitiesActionEnum.COMMENTED:
            url = '/content-management/comment-' + id
            break;
        case ActivitiesActionEnum.SEND_CHAT:
            url = '/chat-management/detail-' + id
            break;
        case ActivitiesActionEnum.SEND_POST:
            url = '/content-management/content-' + id
            break;
        case AdminActivitiesActionEnum.BAN_COMMENT:
            url = '/content-management/comment-' + id
            break;
        case AdminActivitiesActionEnum.BAN_CHAT:
            url = '/chat-management/detail-' + id
            break;
        case AdminActivitiesActionEnum.BAN_POST:
            url = '/content-management/content-' + id
            break;
    }
    return url
}