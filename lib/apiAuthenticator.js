process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if(Meteor.isServer) {
	getAPIToken = function(isLive) {
		try {
			let encryptionKey = Meteor.settings.private.encryptionKey;
			let encryptedAuthorizationHeader = UserProfile.find({userId: Meteor.userId()}).fetch()[0].apiAuthorizationHeader;
			let authorizationHeader = CryptoJS.AES.decrypt(encryptedAuthorizationHeader, encryptionKey).toString(CryptoJS.enc.Utf8);

			let apiUri = isLive ? URI_LIVE_KEYCLOAK : URI_TEST_KEYCLOAK;
			const result = HTTP.post(apiUri, {
				headers:{
					"content-type": "application/x-www-form-urlencoded",
					// "Authorization": "basic "+(new Buffer(usernamePassword, "ascii")).toString("base64")
					"Authorization": "basic " + authorizationHeader					
				},		
				// params: {
				// 	grant_type			: 'password',
				// 	client_id				: 'postman',
				// 	username				: USERNAME,
				// 	password				: PASSWORD
				// }
			});
			return result.data.access_token;
		}
		
		catch (error) {
			// Got a network error, timeout, or HTTP error in the 400 or 500 range.
			// If the API responded with an error message and a payload
			if (error.response) {
				var errorCode = error.response.data.code;
				var errorMessage = error.response.data.message;
				// Otherwise use a generic error message
			} 
			
			else {
				var errorCode = 500;
				var errorMessage = 'Cannot access the API';
			}
		
			// Create an Error object and return it via callback
			let myError = new Meteor.Error(errorCode, errorMessage);
			return myError;
		}
	}
};