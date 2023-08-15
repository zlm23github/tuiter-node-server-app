import usersModel from "./users-model.js";


export const findAllUsers = () => {
    const users = usersModel.find();
    return users;
}


export const findUserById = (id) => {
    const user = usersModel.findById(id);
    return user;
};


export const findUserByUsername = (username) => {
    const user = usersModel.findOne({ username });
    return user;
};


export const findUserByCredentials = (username, password) => {
    const user = usersModel.findOne({ username, password });
    return user;
};


export const createUser = (user) => {
    const newUser = usersModel.create(user);
    return newUser;
};


export const updateUser = (id, user) => {
    const status = usersModel.updateOne({ _id: id }, { $set: user });
    return status;
};
export const deleteUser = (id) => {
    const user = usersModel.deleteOne({ _id: id });
    return user;
};
