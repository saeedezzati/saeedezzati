import { ApiUser } from "./ApiUser";

export const api = {
    deleteItems: {
        User: (ids, dispatch) => ApiUser.deleteUsers(ids, dispatch)
    },
    editItem: {
        User: (id, newData, dispatch) => ApiUser.addUser(id, newData, dispatch)
    }

};

