const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    const user = req.query.user;
    res.send(user + "Boss");
});

const users = [];

app.post("/create_user", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password }); 
    console.log(users); 
    res.json({ loggedIn: true, status: "Everything went well" });
});

app.get("/users", (_, res) => {
    res.json(users)
});


app.put("/update_user/:username", (req, res) => {
    const { username } = req.params;
    const { password } = req.body;

    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users[index].password = password;
        res.json({ status: "User updated successfully" });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.delete("/delete_user/:username", (req, res) => {
    const { username } = req.params;

    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ status: "User deleted successfully" });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
