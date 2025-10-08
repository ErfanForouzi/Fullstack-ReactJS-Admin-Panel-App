export const ROLE_HIERARCHY = {
    ADMIN:["USER","WRITER","MODERATOR"],
    MODERATOR:["USER","WRITER"],
    WRITER:["USER"],
    USER:[],
}