import { v4 as uuidv4 } from 'uuid';

export default () => {
    let uuid = localStorage.getItem("uuid");

    if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem("uuid", uuid);
    }

    return uuid;
}