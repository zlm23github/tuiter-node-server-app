import * as usersDao from "./users-dao.js";

let currentUser;
const AuthController = (app) => {
    
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = usersDao.createUser(req.body);
        currentUser = newUser;
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };
     
    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            currentUser = user;
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };
        
    const profile = (req, res) => {
        // const currentUser = req.session["currentUser"];
        const current = currentUser; 
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
    
    const update = (req, res) => { 
        // const currentUser = req.session["currentUser"];
        const current = currentUser;
        if (!current) {
            res.sendStatus(404);
            return;
        }
        const newUpdate = usersDao.updateUser(req.body);
        req.session["currentUser"] = newUpdate;
        currentUser = newUpdate;
        res.json(currentUser);

    };

    app.post("/api/users/register", register); 
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
};
export default AuthController;