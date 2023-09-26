/**
 * Defines common Spacebars helper methods used across various Blaze templates.
 */

if(Meteor.isClient) {

	/**
	 * Returns all countries.
	 */
	Template.registerHelper('countries', function() {return COUNTRIES;}); 

  /**
	 * Returns all roles.
	 */
  Template.registerHelper('userRoles', function() {return USER_ROLES;}); 
  
	/**
	 * Returns all available genders (e.g. Male).
	 */
	Template.registerHelper("genderOptions",function() {return CUSTOMER_GENDER_OPTIONS;});

	/**
	 * Returns all available customer titles (e.g. Mr, Mrs).
	 */
	Template.registerHelper("titleOptions",function() {return CUSTOMER_TITLE_OPTIONS;});

	/**
	 * Returns all available incorporation types (e.g. Sole trader).
	 */
	Template.registerHelper("incorporationTypeOptions",function() {return INCORPORATION_TYPE_OPTIONS;});

	/**
	 * Returns all available business purposes (e.g. Regulated entity).
	 */
	Template.registerHelper("businessPurposeOptions",function() {return BUSINESS_PURPOSE_OPTIONS;});


	/**
	 * Returns all available document types (e.g. Passport).
	 */
	Template.registerHelper("documentTypeOptions",function() {return DOCUMENT_TYPE_OPTIONS;});

  /**
	 * Returns all available ODD frequencies (e.g. Weekly).
	 */
  Template.registerHelper("oddFrequenciesOptions",function() {return ODD_FREQUENCY_OPTIONS;});

  /**
	 * Returns all available screening types  (e.g. PEP).
	 */
  Template.registerHelper("screeningScopeOptions",function() {return SCREENING_SCOPE_OPTIONS;});
  
	/**
	 * Returns all available priorities  (e.g. High, Low).
	 */
	Template.registerHelper("priorityOptions",function() {return PRIORITY_OPTIONS;});

	/**
	 * Returns all available address types (e.g. Primary).
	 */
  Template.registerHelper("addressTypeOptions",function() {return ADDRESS_TYPE_OPTIONS;});
  
	Template.registerHelper("uriEncode",function(str) {
    let strNew = str.replace(/\//g, 'pPoOlLkKlL');
    strNew = strNew.replace(/\+/g, 'pPoOlLmMnN');
    return strNew;
  });

  Template.registerHelper("uriDecode",function(str) {return str.replace(/000000/g, '/');});

  Template.registerHelper("currentDate",function() {return new Date().toISOString().slice(0,10)});

  Template.registerHelper("previousDate",function(str) {
    let toDate = new Date().toISOString().slice(0,10);
    return moment(toDate, 'YYYY-MM-DD').add(-90, 'days').format('YYYY-MM-DD');
  });

  
	/**
	 * Returns comma-separated string from array, while excluding nulls.
	 */
	Template.registerHelper('commaSeparatedValues', function () {
		var args = Array.prototype.slice.call(arguments, 0, -1);
		return commaSeparatedValues(args);
	});  

	/**
	 * Returns country name corresponding to 3-letter ISO code
	 * @param {string} countryIso - The ISO 3166-1 alpha-3 code, e.g. GBR.
	 */
	Template.registerHelper('toCountryName', function(countryIso) {return convertCountryCode(countryIso);});
	
  Template.registerHelper('getCountryFlag', function(countryIso) {return getCountryFlag(countryIso);});
	

	/**
	 * Returns string in title case, e.g. "john doe" will be returned "John Doe".
	 */
  Template.registerHelper('toTitleCase', function(str) { return toTitleCase (str);});
	
	/**
	 * Returns string in lower case.
	 */
  Template.registerHelper('toLowerCase', function(str) {return str.toLowerCase();});
	
	/**
	 * Returns comma-separated string from array, while replacing last comma with 'and'.
	 */
	Template.registerHelper('toSentence', function(array) {return toSentence(array);});
	
	/**
	 * Returns true if two strings are matching, otherwise false.
	 */
  Template.registerHelper("isEqual",function(str1,str2) {return isEqual(str1,str2);});

  Template.registerHelper("truncateByNumberOfChars",function(str,num) {return truncateByNumberOfChars(str,num);});

  
  Template.registerHelper('add', function(num1,num2) {return add(num1,num2);}); 


  Template.registerHelper("isLess",function(number1,number2) {return isLess(number1,number2);});
	Template.registerHelper("stringSizeLessThan",function(str, num) {return stringSizeLessThan(str,num);});
  
	
  Template.registerHelper("decrypt",function(apiAuthorizationHeader) {
    if(apiAuthorizationHeader){
      return ReactiveMethod.call('adminDecryptAuthorizationHeader', apiAuthorizationHeader);
    }
    else{
      return null;
    }
	});
	
	/**
	 * Returns 'selected' if two strings are matched. This is used by drop-down lists for
	 * selecting stored server-side values.
	 */
	Template.registerHelper("isSelected",function(str1,str2){
		if (str1 && str2) {
			if(str1.toLowerCase() === str2.toLowerCase()){return 'selected';}
			else{return '';}
		}
		else{return '';}
	});

  /**
	 * Returns 'selected' if a string exsts within an array of strings. This is used 
   * by drop-down lists for selecting stored server-side values.
	 */
	Template.registerHelper("isSelectedArray",function(str,stringArray){
		if (str && stringArray) {
      for(i=0;i < stringArray.length;i++){
        if(str.toLowerCase() === stringArray[i].toLowerCase()){return 'selected';}        
      }
      return '';
		}
		else{return '';}
  });
  
  /**
	 * Returns 'checked' if boolean expression is true. This is used by checkbox components.
	 */
	Template.registerHelper("isChecked",function(bool){
		if (bool) {
			return 'checked';
		}
		else{return '';}
  });
  
	/**
	 * Returns logical AND boolean value for an array of strings. 
	 */
	Template.registerHelper('and', function () { 
		let args = Array.prototype.slice.call(arguments, 0, -1);
		return and(args);
	});
	
	/**
	 * Returns a predefined string intended to replace empty string values.
	 * Used for display purposes.
	 */
	Template.registerHelper("empty",function(str1,str2) {return EMPTY;});

	/** 
	 * Returns a predefined value if a string argument is null / undefined.
	 * Used for display purposes.
	 */
  Template.registerHelper("emptyIfNull",function(str) {return str || EMPTY;});
	
	/**
	 * Returns string date in requested date format.
	 * @param {string} strDate - The date as string.
	 * @param {string} format - The format of the date to return, e.g. "DD/MM/YYYY"
	 */
  Template.registerHelper('dateConvert', function(strDate,format) {return dateConvert(strDate,format);});

  Template.registerHelper('roundToWhole', function(str) {return str.toFixed(0);});

  Template.registerHelper('roundToDecimalPlaces', function(number, decimalPlaces) {return number.toFixed(decimalPlaces);});

  Template.registerHelper('countArray', function(array) {return countArray(array);});
	
  Template.registerHelper("getTextFromValue",function(str) {return getTextFromValue(DISPLAY_TEXT, str);});

  Template.registerHelper("returnIf",function(str1, str2, returnText) {return returnIf(str1, str2, returnText);});
	
  Template.registerHelper("monthName",function(month) {return monthName(month);});	
	
	/**
	 * Returns string date in requested date format.
	 * @param {string} strDate - The date as string.
	 * @param {string} format - The format of the date to return, e.g. "DD/MM/YYYY"
	 */
	Template.registerHelper('resultSummary', function(array) {
		if(!array){return '';}
		let tempResult = JSON.stringify(array);
		let result = '';
		let resultTextCss = '';
		let resultIconColorCss = '';
		let resultIconCss = '';
		let resultObject = [];


		if(tempResult.includes('AWAITING_VALIDATION')){
			result = getTextFromValue(DISPLAY_TEXT,'AWAITING_VALIDATION');
		 	resultTextCss = 'warning';
			resultIconColorCss = 'yellow-bg';
		  resultIconCss = 'minus';
		}

		else if(tempResult.includes('IN_PROGRESS')){
			result = getTextFromValue(DISPLAY_TEXT,'IN_PROGRESS');
			resultTextCss = 'success';
			resultIconColorCss = 'blue-bg';
			resultIconCss = 'ellipsis-h';
		}

		else if(tempResult.includes('CONFIRMED')){
			result = getTextFromValue(DISPLAY_TEXT,'CONFIRMED');
			resultTextCss = 'danger';
			resultIconColorCss = 'red-bg';
			resultIconCss = 'exclamation';
	 	}

		else if(tempResult.includes('DISMISSED')){
			result = getTextFromValue(DISPLAY_TEXT,'DISMISSED');
			resultTextCss = 'primary';
			resultIconColorCss = 'navy-bg';
			resultIconCss = 'check';
 		}

		 else if(tempResult.includes('ATTENTION')){
			result = getTextFromValue(DISPLAY_TEXT,'ATTENTION');
		 	resultTextCss = 'danger';
			resultIconColorCss = 'red-bg';
		  resultIconCss = 'exclamation';
		}
		
		else if(tempResult.includes('ERROR')){
			result = getTextFromValue(DISPLAY_TEXT,'ERROR');
		 	resultTextCss = 'warning';
			resultIconColorCss = 'yellow-bg';
		  resultIconCss = 'minus';
		}
		
		else if(tempResult.includes('CLEAR')){
			result = getTextFromValue(DISPLAY_TEXT,'CLEAR');
			resultTextCss = 'primary';
			resultIconColorCss = 'navy-bg';
			resultIconCss = 'check';
		}

		return resultObject = [
			{
				"result" : result,
				"resultTextCss" : resultTextCss,
				"resultIconColorCss" : resultIconColorCss,
				'resultIconCss':resultIconCss
			}
		];
	});

	Template.registerHelper('scoreSummary', function(score) {
		let intScore = Number(score);
		if(!intScore){return '';}
		else if(intScore < 80){return 'warning';}
		else{return 'danger';}
  });
  
  Template.registerHelper('getVerificationResultSymbol', function(outcome) {
    switch(outcome.toLowerCase()){
      case 'clear':
        return "<i class='fa fa-check-circle fa-lg' aria-hidden='true' style='padding-top:5px;color:#328EEC'></i>";
        break;

      case 'error':
        return "<i class='fa fa-exclamation-circle fa-lg' aria-hidden='true' style='padding-top:5px;color:#f8ac59'></i>";
        break;

      case 'attention':
        return "<i class='fa fa-exclamation-circle fa-lg' aria-hidden='true' style='padding-top:5px;color:#f8ac59'></i>";
        break;

      case 'not_applicable':
        return "<i class='fa fa-minus-circle fa-lg' aria-hidden='true' style='padding-top:5px;color:grey'>";
        break;

      default:
        break;
    }
  });
}