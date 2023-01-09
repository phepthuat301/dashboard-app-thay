export enum ContentStatusEnum {
    DELETED = 'deleted',
    DELETEDPUBLIC = 'public',
}

export enum ChatRoomEnum {
    SINGLE = 'Single',
    GROUP = 'Group',
}

export enum ReportByEnum {
    USER = 'User',
    BOT = 'Bot',
}

export enum ActivitiesActionEnum {
    SEND_CHAT = 'SEND_CHAT',
    SEND_POST = 'SEND_POST',
    COMMENTED = 'COMMENTED',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT'
}

export enum AdminActivitiesActionEnum {
    BAN_CHAT = 'SEND_CHAT',
    BAN_POST = 'SEND_POST',
    BAN_COMMENT = 'COMMENTED'
}