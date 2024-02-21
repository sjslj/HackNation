// app.js

const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name });
        if (existingUser) {
            res.send("User already exists");
        } else {
            const newUser = new LogInCollection({
                name: req.body.name,
                password: req.body.password // Remember to hash this password before saving
            });
            await newUser.save();
            res.status(201).render("home", { naming: req.body.name });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name });
        if (!user) {
            res.send("User not found");
        } else if (user.password !== req.body.password) {
            res.send("Incorrect password");
        } else {
            res.status(201).render("home", { naming: req.body.name });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
