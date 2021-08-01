var express = require('express');
var app = express();
var unirest = require('unirest');
var request = unirest(
	'POST',
	'https://www.fast2sms.com/dev/bulkV2'
);
var cors = require('cors');

// Middleware
app.use(cors());

// GET Request for sending OTP to a number
app.get('/api/sendOTP/:number', (req, res) => {
	const OTP = Math.floor(
		1000 + Math.random() * 9000
	);
	request.headers({
		authorization:
			'AGLpaT2n0qBj3UsOvmhH597tRQ4DeXFbKwgVdo6C81zYSNfxWltuifKqSYOXc52d8RU9xB1jvMh4Pgl0',
	});

	request.form({
		sender_id: 'FSTSMS', // Set your own "sender_id"
		message: `Hey this is Twisam, Im just testing my OTP module, if get this OTP that means you are a friend of mine :). Your OTP is ${OTP}`, // template id
		language: 'english',
		route: 'v3', // Transactional Route SMS
		variables: '{#AA#}',
		variables_values: OTP,
		numbers: req.params.number, // Number present in GET request
	});

	request.end(function (res) {
		if (res.error) console.log('error at otp');

		console.log(res.body);
	});
	// response send back
	res.send({
		Number: req.params.number,
		OTP: OTP,
	});
});

// server running on PORT
var port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
	console.log(`Running on ${port}`);
});
