module.exports = {
	'facebookAuth': {
		'clientID': '1949429758633181',
		'clientSecret': process.env.FACEBOOK_AUTH,
		'callbackURL': 'https://thedrop.herokuapp.com/auth/facebook/callback',
		'profileFields': ['emails', 'displayName']
	}
}
