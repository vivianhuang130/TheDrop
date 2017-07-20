module.exports = {
	'facebookAuth': {
		'clientID': '1949429758633181',
		'clientSecret': process.env.FACEBOOK_AUTH,
		'callbackURL': 'http://localhost:3000/auth/facebook/callback',
		'profileFields': ['emails', 'displayName']
	}
}
