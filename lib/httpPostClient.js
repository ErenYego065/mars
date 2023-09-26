/**
 * Defines a generic HTTP POST REST client.
 */

if(Meteor.isServer) {
	Meteor.methods({
		/**
		 * Returns the response from a HTTP POST request.
		 * @param {string} endpoint - The resource endpoint.
		 * @param {string} customerId - The customer ID.
		 * @param {string} body - The body content.
		 * @param {string} parameters - URL parameters for further refinement.
		 * @param {string} resourceId1 - The first sub-resource ID following customer.
		 * @param {string} resourceId2 - The second sub-resource ID following customer.
		 * @param {string} resourceId3 - The third sub-resource ID following customer.
		 */
		 
		postResource(isLive, endpoint, customerId, body, parameters, resourceId1, resourceId2, resourceId3, authorizationHeader){ 
			this.unblock();   

      //Get API key
      let apiKey;
      if(ADMIN_ENDPOINTS.indexOf(endpoint) > -1){
        apiKey = getAdminAPIToken(isLive, authorizationHeader);
      }
      else{
        apiKey = getAPIToken(isLive);
      }

			let contentType = getTextFromValue(CONTENT_TYPE_MAPPPING,endpoint); 
			let environment = isLive ? URI_LIVE_API : URI_TEST_API;
			let apiUri = environment + endpoint;	

			if(customerId)  {apiUri = apiUri.replace('<customer_id>', customerId)};
			if(resourceId1) {apiUri = apiUri.replace('<resource_id_1>', resourceId1)};
			if(resourceId2) {apiUri = apiUri.replace('<resource_id_2>', resourceId2)};
      if(resourceId3) {apiUri = apiUri.replace('<resource_id_3>', resourceId3)};
			if(parameters)	{apiUri = apiUri + parameters};      

			try {
				let result;
				
				if(contentType === 'application/x-www-form-urlencoded')
				{
					result= HTTP.post(apiUri, {
						headers:{
							"authorization"	: "Bearer " + apiKey,
							"cache-control"	: "no-cache",
							"content-type"	: contentType
						},
						params:body
					});
				}
				else {
					result= HTTP.post(apiUri, {
						headers:{
							"authorization"	: "Bearer " + apiKey,
							"cache-control"	: "no-cache",
							"content-type"	: contentType
						},
						data:body
					});
				}

				return result;
			} 
			
			catch (error) {
				// HTTP error in the 400 or 500 range.
				// If the API responded with an error message and a payload
				let errorCode;
				let errorMessage;
				let errorDetails;
        let resourceLabel = getTextFromValue(URI_LABEL_MAPPING,endpoint); 
        console.log(resourceLabel);
				console.log(error);

				if (error.response) {
					errorCode  = error.response.statusCode;

					if (errorCode === 400) {
            let apiErrorObject = JSON.parse(error.response.content);
						let apiErrorType = apiErrorObject.type;
            errorMessage = getTextFromValue(ERROR_TYPE_DESCRIPTION_MAPPPING,apiErrorType);
            errorDetails = getDescriptionFromValue(ERROR_TYPE_DESCRIPTION_MAPPPING,apiErrorType);
            if(!errorDetails){errorDetails=apiErrorObject.message;}
            else{errorDetails = errorDetails.replace('<attribute_label>',resourceLabel);}
            
            errorMessage = (errorMessage !== 'resource') ? errorMessage : HTTP_400_MESSAGE;
            errorDetails = (errorDetails  !== 'resource') ? errorDetails : HTTP_400_DETAILS;            
          }
          
					else if (errorCode === 401) {
						errorMessage = HTTP_401_MESSAGE;
						errorDetails = HTTP_401_DETAILS;
					}

					else if (errorCode === 403) {
						errorMessage = HTTP_403_MESSAGE.replace('<resource_label>', resourceLabel);
						errorDetails = HTTP_403_DETAILS.replace('<resource_label>', resourceLabel);
					}
					
					else if (errorCode === 404) {
						errorMessage = HTTP_404_MESSAGE.replace('<resource_label>', resourceLabel);
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
}