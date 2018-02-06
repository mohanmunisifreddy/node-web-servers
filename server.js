const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', '\n' + log, (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',     
		welcome: 'Welcome to the Shoutrax website'
	})
});

// app.use( (req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Under Maintenance'
// 	});
// });

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});


app.get('/projects', (req,res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects page'
	});
});

app.get('/bad', (req, res) => {
	res.send( {
		errorMessage : 'Unable to fetch data',
	});
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

app.use(express.static(__dirname + '/public'));