/**
 * Defines a generic HTTP GET REST client.
 */

if(Meteor.isServer) {
	Meteor.methods({
		/**
		 * Returns the response from a HTTP GET request.
		 * @param {string} endpoint - The resource endpoint.
		 * @param {string} customerId - The customer ID.
		 * @param {string} parameters - URL parameters for further refinement.
		 * @param {string} resourceId1 - The first sub-resource ID following customer.
		 * @param {string} resourceId2 - The second sub-resource ID following customer.
		 * @param {string} resourceId3 - The third sub-resource ID following customer.
		 */
		 
		getResource(isLive, endpoint, customerId, parameters, resourceId1, resourceId2, resourceId3, authorizationHeader){ 
			this.unblock();      
      
   //Get API key 
   let apiKey = getUserAuthenticationKey();
			let environment = isLive ? URI_LIVE_API : URI_TEST_API;
			let apiUri = environment + endpoint;

			if(customerId)  {apiUri = apiUri.replace('<customer_id>', customerId)};
			if(resourceId1) {apiUri = apiUri.replace('<resource_id_1>', resourceId1)};
			if(resourceId2) {apiUri = apiUri.replace('<resource_id_2>', resourceId2)};
			if(resourceId3) {apiUri = apiUri.replace('<resource_id_3>', resourceId3)};
			if(parameters)	{apiUri = apiUri + parameters};
			
			console.log(apiUri);

			try {
				return getRequest(apiKey, apiUri, endpoint);
			} 
			
			catch (error) {
				// HTTP error in the 400 or 500 range.
				// If the API responded with an error message and a payload
				let errorCode;
				let errorMessage;
				let errorDetails;
				let resourceLabel = getTextFromValue(URI_LABEL_MAPPING,endpoint); 
				console.log(error);
				
				if (error.response) {
					errorCode  = error.response.statusCode;

					if (errorCode === 400) {
						errorMessage = HTTP_400_MESSAGE;
						errorDetails = HTTP_400_DETAILS;
					}

					else if (errorCode === 401) {
						if(ADMIN_ENDPOINTS.indexOf(endpoint) > -1){
						apiKey = getAdminAPIToken(isLive, authorizationHeader);
						}
						else {
						apiKey = getAPIToken(isLive);
						updateUserAuthenticationKey(apiKey);
						}
					
						try {
						return getRequest(apiKey, apiUri, endpoint);
						} 
						catch (error) {
						errorMessage = HTTP_401_MESSAGE;
						errorDetails = HTTP_401_DETAILS;
								throw new Meteor.Error(errorCode, errorMessage, errorDetails);
						}
					}

					else if (errorCode === 403) {
            if(ADMIN_ENDPOINTS.indexOf(endpoint) > -1){
              apiKey = getAdminAPIToken(isLive, authorizationHeader);
            }
            else {
              apiKey = getAPIToken(isLive);
              updateUserAuthenticationKey(apiKey);
            }
           
            try {
              return getRequest(apiKey, apiUri, endpoint);
            } 
            catch (error) {
              errorMessage = HTTP_403_MESSAGE.replace('<resource_label>', resourceLabel);
              errorDetails = HTTP_403_DETAILS.replace('<resource_label>', resourceLabel);
      				throw new Meteor.Error(errorCode, errorMessage, errorDetails);
            }
					}
					
					else if (errorCode === 404) {
						errorMessage = HTTP_404_MESSAGE;
						errorDetails = HTTP_404_DETAILS.replace('<resource_label>', resourceLabel);
					}

					else if (errorCode === 409) {
						errorMessage = HTTP_409_MESSAGE.replace('<resource_label>', resourceLabel);
						errorDetails = HTTP_409_DETAILS.replace('<resource_label>', resourceLabel);
					}

					else if (errorCode === 410) {
						errorMessage = HTTP_410_MESSAGE.replace('<resource_label>', resourceLabel);
						errorDetails = HTTP_410_DETAILS.replace('<resource_label>', resourceLabel);
					}

					else if (errorCode === 500) {
						errorMessage = HTTP_500_MESSAGE;
						errorDetails = HTTP_500_DETAILS;
					}

					else if (errorCode === 503) {
						errorMessage = HTTP_503_MESSAGE;
						errorDetails = HTTP_503_DETAILS;
					}

					else {
						errorMessage = HTTP_ERROR_MESSAGE;
						errorDetails = HTTP_ERROR_DETAILS;
					}
				}

				else {
					errorCode = 500;
					errorMessage = HTTP_500_MESSAGE;
					errorDetails = HTTP_500_DETAILS;
				}

				// Create an Error object and return it via callback
				throw new Meteor.Error(errorCode, errorMessage, errorDetails);
			}
		}
  });
  
  getRequest = function (apiKey, apiUri, endpoint) {
    if((endpoint != URL_DOC_DOWNLOAD) && (endpoint != URI_REPORT_DOWNLOAD)){
      let result = HTTP.get(apiUri, {
        headers:{
          "authorization"	: "Bearer " + apiKey,
          "cache-control"	: "no-cache",
          "content-type"	: "application/json"
        }
      });			
      return result;
    }
    else{
      let result = request.getSync(apiUri, {
        headers: {
          "authorization"	: "Bearer " + apiKey,
          "cache-control"	: "no-cache",
          "content-type"	: "application/json"
        },
        encoding: null
      });
      // console.log(result.body.toString());
      //let encodedResult = new Buffer(result.body).toString('base64');
      return result.body;
      // return encodedResult;
    }
  }    
}