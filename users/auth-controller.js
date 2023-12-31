import * as usersDao from "./users-dao.js";

let currentUser;
const AuthController = (app) => {

    const register = async(req, res) => {
        console.log("2");
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        console.log(newUser);
        currentUser = newUser;
        res.json(newUser);
    };
    
    const login = async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
            currentUser = user;
            res.json(user);
            } else {
            res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
        
    };
        
    const profile = async (req, res) => {
        const current = currentUser;
        // const current = currentUser; 
        console.log("in profile auth-controller", current);
        if (!current) {
            res.sendStatus(404);
            return;
        }
        res.json(current);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async(req, res) => { 
        const current = currentUser;
        console.log(current);
        // const current = currentUser;
        if (!current) {
            res.sendStatus(404);
            return;
        }
        const id = req.params.uid;
        const newUpdate = await usersDao.updateUser(id, req.body);
        console.log(newUpdate);
        currentUser = newUpdate;
        res.json(newUpdate);

    };
    app.post("/api/users/register", register); 
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users/:uid",     update);
};
export default AuthController;



// const AuthController = (app) => {
    
//     const register = async(req, res) => {
//         console.log("2");
//         const user = await usersDao.findUserByUsername(req.body.username);
//         if (user) {
//             res.sendStatus(403);
//             return;
//         }
//         const newUser = await userDao.createUser(req.body);
//         req.session["currentUser"] = newUser;
//         res.json(newUser);
//     };
     
//     const login = async(req, res) => {
//         const username = req.body.username;
//         const password = req.body.password;
//         if (username && password) {
//             const user = await usersDao.findUserByCredentials(username, password);
//             if (user) {
//               req.session["currentUser"] = user;
//               res.json(user);
//             } else {
//               res.sendStatus(403);
//             }
//           } else {
//             res.sendStatus(403);
//           }
        
//     };
        
//     const profile = (req, res) => {
//         // const currentUser = req.session["currentUser"];
//         const current = currentUser; 
//         if (!current) {
//             res.sendStatus(404);
//         return;
//         }
//         res.json(current);
//     };
    
//     const logout = async (req, res) => {
//         req.session.destroy();
//         res.sendStatus(200);
//     };
    
//     const update = async(req, res) => { 
//         // const currentUser = req.session["currentUser"];
//         const current = currentUser;
//         if (!current) {
//             res.sendStatus(404);
//             return;
//         }
//         const newUpdate = await usersDao.updateUser(req.body);
//         req.session["currentUser"] = newUpdate;
//         res.json(newUpdate);

//     };

//     app.post("/api/users/register", register); 
//     app.post("/api/users/login",    login);
//     app.post("/api/users/profile",  profile);
//     app.post("/api/users/logout",   logout);
//     app.put ("/api/users",          update);
// };
// export default AuthController;