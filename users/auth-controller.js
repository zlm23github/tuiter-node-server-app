import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
    console.log("1");
    const register = async(req, res) => {
        console.log("2");
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await userDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };
     
    const login = async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
              req.session["currentUser"] = user;
              res.json(user);
            } else {
              res.sendStatus(403);
            }
          } else {
            res.sendStatus(403);
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
    
    const update = async(req, res) => { 
        // const currentUser = req.session["currentUser"];
        const current = currentUser;
        if (!current) {
            res.sendStatus(404);
            return;
        }
        const newUpdate = await usersDao.updateUser(req.body);
        req.session["currentUser"] = newUpdate;
        res.json(newUpdate);

    };

    app.post("/api/users/register", register); 
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
};
export default AuthController;