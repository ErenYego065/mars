if (Meteor.isServer) {
 Meteor.methods({
  userConsumption: function (isLive, accountAuthorizationHeader, fromDate, toDate) {
   try {
    let authResult;;
    let authUri = isLive ? URI_LIVE_KEYCLOAK : URI_TEST_KEYCLOAK;
    let environment = isLive ? URI_LIVE_API : URI_TEST_API;
    let authHeaderDetails = {
     "content-type": "application/x-www-form-urlencoded",
     "Authorization": "basic " + accountAuthorizationHeader
    };
    let getHeaderDetails;
    let customerCountResult = screeningCountResult = docVerificationCountResult = 0;
    let customerCount = screeningCount = docVerCount = idVerCount = 0;
    let wl = pep = dde = ame = 0;
    let finalResult;

    let screeningCountApi = environment + URI_SEARCH_SCREENINGS + '?size=1000&created_after=' + fromDate + '&created_before=' + toDate + '&disable_customer_filter=true';
    let docVerificationCountApi = environment + URI_SEARCH_VERIFICATIONS + '?size=1000&created_after=' + fromDate + '&created_before=' + toDate + '&disable_customer_filter=true';
    let idVerificationCountApi = environment + URI_SEARCH_IDENTIFICATIONS + '?size=1000&created_after=' + fromDate + '&created_before=' + toDate + '&disable_customer_filter=true';

    let customerCountApi = environment + URI_ALL_CUSTOMERS + '?size=1000&created_after=' + fromDate + '&created_before=' + toDate;

    authResult = HTTP.post(authUri, {
     headers: authHeaderDetails
    });
    getHeaderDetails = {
     "authorization": "Bearer " + authResult.data.access_token,
     "cache-control": "no-cache",
     "content-type": "application/json"
    };

    screeningCountResult = HTTP.get(screeningCountApi, {
     headers: getHeaderDetails
    });
    screeningCount = screeningCountResult.data.total_elements;
    for (let i = 0; i < screeningCountResult.data.content.length; i++) {
     if (screeningCountResult.data.content[i].scope.includes('WATCHLIST')) {
      wl++;
     }
     if (screeningCountResult.data.content[i].scope.includes('PEP')) {
      pep++;
     }
     if (screeningCountResult.data.content[i].scope.includes('DISQUALIFIED_ENTITIES')) {
      dde++;
     }
     if (screeningCountResult.data.content[i].scope.includes('ADVERSE_MEDIA')) {
      ame++;
     }
    }

    docVerificationCountResult = HTTP.get(docVerificationCountApi, {
     headers: getHeaderDetails
    });
    docVerCount = docVerificationCountResult.data.total_elements;

    idVerificationCountResult = HTTP.get(idVerificationCountApi, {
     headers: getHeaderDetails
    });
    idVerCount = idVerificationCountResult.data.total_elements;

    customerCountResult = HTTP.get(customerCountApi, {
     headers: getHeaderDetails
    });
    customerCount = customerCountResult.data.total_elements;

    finalResult = {
     fromDate: fromDate.toString(),
     toDate: toDate.toString(),
     totalScreeningChecks: screeningCount,
     totalDocVerChecks: docVerCount,
     totalIdVerChecks: idVerCount,
     totalCustomer: customerCount,
     wlCount: wl,
     pepCount: pep,
     ddCount: dde,
     amCount: ame
    }
    return finalResult;
   } catch (error) {
    console.log(error);
    throw new Meteor.Error(error);
   }
  },
  // seedAccount = function(isLive, newAccountAuthorizationHeader){
  seedAccount: function (isLive, newAccountAuthorizationHeader) {
   try {
    let authResult;
    let createCustomerResult;
    let checkResult;
    let authUri = isLive ? URI_LIVE_KEYCLOAK : URI_TEST_KEYCLOAK;
    let authHeaderDetails = {
     "content-type": "application/x-www-form-urlencoded",
     "Authorization": "basic " + newAccountAuthorizationHeader
    };
    let headerDetails;
    let contentType;
    let postBody;
    let environment = isLive ? URI_LIVE_API : URI_TEST_API;

    for (let i = 0; i < NEW_ACCOUNT_SEED.length; i++) {
     authResult = HTTP.post(authUri, {
      headers: authHeaderDetails
     });
     apiUri = environment + URI_ALL_CUSTOMERS;
     contentType = getTextFromValue(CONTENT_TYPE_MAPPPING, URI_ALL_CUSTOMERS);
     headerDetails = {
      "authorization": "Bearer " + authResult.data.access_token,
      "cache-control": "no-cache",
      "content-type": contentType
     }
     createCustomerResult = HTTP.post(apiUri, {
      headers: headerDetails,
      data: NEW_ACCOUNT_SEED[i].payload
     });
     customer = JSON.parse(createCustomerResult.content)
     if (NEW_ACCOUNT_SEED[i].seed_config.is_screen) {
      apiUri = environment + URI_ALL_SCREENINGS;
      apiUri = apiUri.replace('<customer_id>', customer.id);
      postBody = NEW_ACCOUNT_SEED[i].seed_config.screen_scope;
      checkResult = HTTP.post(apiUri, {
       headers: headerDetails,
       data: postBody
      });

      if (NEW_ACCOUNT_SEED[i].seed_config.is_odd) {
       apiUri = environment + URI_ALL_ODD;
       apiUri = apiUri.replace('<customer_id>', customer.id);
       postBody = NEW_ACCOUNT_SEED[i].seed_config.odd_body;
       checkResult = HTTP.post(apiUri, {
        headers: headerDetails,
        data: postBody
       });
      }
     }
     if (NEW_ACCOUNT_SEED[i].seed_config.is_doc_upload) {
      apiUri = environment + URI_ALL_DOCUMENTS;
      apiUri = apiUri.replace('<customer_id>', customer.id);
      postBody = NEW_ACCOUNT_SEED[i].seed_config.doc_upload_body;
      checkResult = HTTP.post(apiUri, {
       headers: headerDetails,
       data: postBody
      });
      document = JSON.parse(checkResult.content)

      if (NEW_ACCOUNT_SEED[i].seed_config.is_doc_ver) {
       apiUri = environment + URI_ALL_DOC_VERIFICATIONS;
       apiUri = apiUri.replace('<customer_id>', customer.id);
       postBody = {
        "document_id": document.id,
        "type": "image"
       };
       checkResult = HTTP.post(apiUri, {
        headers: headerDetails,
        data: postBody
       });
      }
      if (NEW_ACCOUNT_SEED[i].seed_config.is_id_ver) {
       apiUri = environment + URI_ALL_IDENTIFICATIONS;
       apiUri = apiUri.replace('<customer_id>', customer.id);
       postBody = {
        "document_id": document.id,
        "selfie_image": SELFIE_IMAGE
       };
       checkResult = HTTP.post(apiUri, {
        headers: headerDetails,
        data: postBody
       });
      }
     }
    }
   } catch (error) {
    console.log(error);
    throw new Meteor.Error(error);
   }
  },
  registerUser: function (isLive, companyName, companyEmail, contactName, apiClientId) {
   this.unblock();
   try {
    let newUserAuthCode;
    let defaultPlanId;
    let apiClientKey;
    let body = {
     name: companyName,
     email: companyEmail,
     api_client_id: apiClientId,
     verifications_credit: 1000
    }

    let response = Async.runSync(function (done) {
     Meteor.call('postResource', isLive, URI_USER_REGISTER, null, body, null, null, null, null, Meteor.settings.private.adminAuthCode, function (err, res) {
      if (err) {
       done('Error creating KK account', null);
      } else {
       newUserAuthCode = res.data.auth_string;
       Meteor.call('getResource', isLive, URI_ALL_USER_PLANS, null, null, null, null, null, Meteor.settings.private.adminAuthCode, function (err, res) {
        if (err) {
         done('Error retrieving plans', null);
        } else {
         let result = JSON.parse(res.content);
         for (let i = 0; i < result.content.length; i++) {
          if (result.content[i].type === 'STANDARD') {
           defaultPlanId = result.content[i].id;
           break;
          }
         }

         let subscribeUserToPlanBody = {
          plan_id: defaultPlanId
         }

         Meteor.call('postResource', isLive, URI_SUBSCRIBE_PLAN, null, subscribeUserToPlanBody, null, null, null, null, newUserAuthCode, function (err, res) {
          if (err) {
           done('Error subscribing user to plan', null);
          } else {
           let user = {
            username: companyEmail,
            email: companyEmail,
            password: Meteor.settings.private.newAccountPassword
           }
           Meteor.call('adminCreateUser', user, companyName, companyEmail, function (err, res) {
            if (err) {
             done('Error creating WebApp account', null);
            } else {
             let apiAuthorizationHeader = newUserAuthCode;
             Meteor.call('adminUpdateUserAccount', companyName, apiAuthorizationHeader, res, function (err, res) {
              if (err) {
               done('Error Sending Email', null);
              } else {
               apiClientKey = new Buffer(newUserAuthCode, "base64").toString()
               apiClientKey = apiClientKey.split(':')[1];
               // seedAccount(isLive, newUserAuthCode);               
               sendWelcomeEmail(companyEmail, contactName, apiClientId, apiClientKey);
               Meteor.call('seedAccount', isLive, newUserAuthCode, function (err, res) {
                if (err) {
                 done('Error seeding account', null);
                } else {
                 done(null, newUserAuthCode);
                }                
               });
              }
             });
            }
           });
          }
         });
        }
       });
      }
     });
    });

    return response;
   } catch (error) {
    return error;
   }
  }
 });
};

sendWelcomeEmail = function (companyEmail, contactName, apiClientId, apiClientKey) {
 try {
  if (!process.env.MAIL_URL) {
   process.env.MAIL_URL = Meteor.settings.private.mailUrl;
  }

  SSR.compileTemplate('htmlEmail', Assets.getText('html-welcome-email.html'));
  let emailData = {
   contactName: contactName,
   portalUsername: companyEmail,
   portalPassword: Meteor.settings.private.newAccountPassword
  };

  Email.send({
   to: companyEmail,
   from: "ClearDil Client Support<support@cleardil.com>",
   sender: "ClearDil Client Support<support@cleardil.com>",
   subject: "Your Sandbox Account",
   bcc: 'eric@cleardil.com,nassim@cleardil.com',
   html: SSR.render('htmlEmail', emailData)
  });
 } catch (error) {
  console.log(error);
  throw new Meteor.Error(error);
 }
}
