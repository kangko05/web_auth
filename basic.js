const express = require("express");
const base64 = require("base-64");

const app = express();
const port = 3000;

const basicAuthMiddleware = (req, res, next) => {
    const encoded =
        req.headers.authorization?.trim().replace(/Basic\s+/i, "") || "";
    const [user, pass] = base64.decode(encoded).split(":");

    if (user === "user" && pass === "pass") {
        return next();
    }

    res.set("www-authenticate", "Basic realm=''");
    res.status(401).send("auth required");
};

app.use(basicAuthMiddleware);
app.use(express.static("public"));

app.get("/auth", (_, res) => {
    res.send("success");
});

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
