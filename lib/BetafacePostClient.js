
if(Meteor.isServer) {
	Meteor.methods({
		betafacePostResource(endpoint, body, authHeader){ 
			this.unblock();   
			console.log(endpoint);
			console.log(body);
			let header;

			if(authHeader){
				header = {
					"content-type"	: "application/json",
					"Ocp-Apim-Subscription-Key":	"a1169bf8580e48fe851706aaa2ae48b2"
				}
			}

			else{
				header = {
					"content-type"	: "application/json"
				}
			}
			
			try {
				let result;
				result= HTTP.post(endpoint, {
					headers: header,
					data:body
				});

				console.log(result);
				return result;
			} 
			
			catch (error) {
				// HTTP error in the 400 or 500 range.
				// If the API responded with an error message and a payload
				let errorCode;
				let errorMessage;
				let errorDetails;
				console.log(error);

				return error;
			}
		}
	});
}