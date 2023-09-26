/**
 * Defines a generic HTTP PATCH REST client.
 */

if(Meteor.isServer) {
	Meteor.methods({
		/**
		 * Returns the response from a HTTP PATCH request.
		 * @param {string} endpoint - The resource endpoint.
		 * @param {string} customerId - The customer ID.
		 * @param {string} operation - The PATCH operation to undertake.
		 * @param {string} path  - The path of the sub-resource to PATCH e.g. '/first_name'.
		 * @param {string} value - The new value for given path.
		 * @param {string} resourceId1 - The first sub-resource ID following customer.
		 * @param {string} resourceId2 - The second sub-resource ID following customer.
		 */

		patchResource(isLive, endpoint,customerId, operation, path, value, resourceId1, resourceId2){ 
			this.unblock();

			//Get API key
			var apiKey = getAPIToken(isLive);
			let environment = isLive ? URI_LIVE_API : URI_TEST_API;
			let apiUri = environment + endpoint;
      
			if(customerId)  {apiUri = apiUri.replace('<customer_id>', customerId)};
			if(resourceId1) {apiUri = apiUri.replace('<resource_id_1>', resourceId1)};
			if(resourceId2) {apiUri = apiUri.replace('<resource_id_2>', resourceId2)};
			
			var patchRequest = {
				headers: {
					'content-type'	: 'application/json',
					'authorization' : 'Bearer'  + apiKey
				},
				data: [{
					 "op": operation,
					 "path": path,
					 "value": value
				}]
			 };
       
       console.log(patchRequest);
			try {
        console.log(apiUri);
				const result = HTTP.call('PATCH', apiUri, patchRequest);
				return result;
			}

			catch (error) {
				// HTTP error in the 400 or 500 range.
				var errorCode;
				var errorMessage;
				var errorDetails;
				var resourceLabel = getTextFromValue(URI_LABEL_MAPPING,endpoint); 
				console.log(error);
				if (error.response) {
					errorCode  = error.response.statusCode;

					if (errorCode === 400) {
						apiErrorObject = JSON.parse(error.response.content);

						if(typeof apiErrorObject.errors != "undefined")
						{
							apiErrorType = apiErrorObject.errors[0].type;
							apiErrorMessage = apiErrorObject.errors[0].message;
							apiErrorField = apiErrorObject.errors[0].field;
							
							switch(resourceLabel){
								case 'customer':
									apiErrorField = customerSchema.label(apiErrorField);
									break;
								case 'address':
									apiErrorField = addressSchema.label(apiErrorField);
									break;
								case 'document':
									apiErrorField = documentSchema.label(apiErrorField);
									break;
							}
							errorMessage = apiErrorField;
							errorDetails = apiErrorMessage;
						}

						else{
							errorMessage = HTTP_400_MESSAGE;
							errorDetails = HTTP_400_DETAILS;
						}
					}

					else if (errorCode === 401) {
						errorMessage = HTTP_401_MESSAGE;
						errorDetails = HTTP_401_DETAILS;
					}

					else if (errorCode === 403) {
						errorMessage = HTTP_403_MESSAGE;
					 	errorDetails = HTTP_403_DETAILS.replace('<resource_label>', resourceLabel);
					}
					
					else if (errorCode === 404) {
						errorMessage = HTTP_404_MESSAGE;
						errorDetails = HTTP_404_DETAILS.replace('<resource_label>', resourceLabel);
					}

					else if (errorCode === 409) {
						apiErrorObject = JSON.parse(error.response.content);
						apiErrorType = apiErrorObject.type;

						errorMessage = getTextFromValue(ERROR_TYPE_DESCRIPTION_MAPPPING,apiErrorType) +' '+ resourceLabel;
						errorDetails = getDescriptionFromValue(ERROR_TYPE_DESCRIPTION_MAPPPING,apiErrorType);
						errorDetails = errorDetails.replace('<attribute_label>',resourceLabel);
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