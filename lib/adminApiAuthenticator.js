if(Meteor.isServer) {
	getAdminAPIToken = function(isLive, authorizationHeader) {
		try {
			let apiUri = isLive ? URI_LIVE_KEYCLOAK : URI_TEST_KEYCLOAK;
			const result = HTTP.post(apiUri, {
				headers:{
					"content-type": "application/x-www-form-urlencoded",
					"Authorization": "basic " + authorizationHeader					
				}
			});
			return result.data.access_token;
		}
		
		catch (error) {

			if (error.response) {
				var errorCode = error.response.data.code;
				var errorMessage = error.response.data.message;
			} 
			
			else {
				var errorCode = 500;
				var errorMessage = 'Cannot access the API';
			}
			let myError = new Meteor.Error(errorCode, errorMessage);
			return myError;
		}
	}
};