const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => res.render('home', { title: 'Home - B-Fit' }));

// Route for the exercises page
app.get('/exercises', (req, res) => res.render('exercises', { title: 'Exercises - B-Fit' }));

// Route for the list page
app.get('/list', (req, res) => res.render('list', { title: 'List - B-Fit' }));

// Route for the nutrition page
app.get('/nutrition', (req, res) => res.render('nutrition', { title: 'Nutrition - B-Fit' }));

// Route for the pricing page
app.get('/pricing', (req, res) => res.render('pricing', { title: 'Pricing - B-Fit' }));

// Route for the strength page
app.get('/strength', (req, res) => res.render('strength', { title: 'Strength - B-Fit' }));

// Route for the login page
app.get('/login', (req, res) => res.render('login', { title: 'Login - B-Fit' }));

// Route for the forgot-password page
app.get('/forgot-password', (req, res) => res.render('forgot-password', { title: 'Forgot Password - B-Fit' }));

// Route for the registration page
app.get('/sign-up', (req, res) => res.render('sign-up', { title: 'Sign Up - B-Fit' }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
