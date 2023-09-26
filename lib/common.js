/**
 * Returns true if enum value is valid based on list of constants.
 * @param {string} constantsObj - The constant object to check.
 * @param {string} enumValue - The enum value to validate.
 */
validateEnum = function (constantsObj, enumValue) {
  if (!enumValue) {
    enumValue = '';
  }

  for (count = 0; count < constantsObj.length; count++) {
    if (constantsObj[count].value === enumValue) {
      return true;
    }
  }
  return false;
};

/**
 * Returns a JSON object which excludes all attributes with null value.
 * @param {string} JsonObj - The JSON object to clean.
 */
cleanJson = function (JsonObj) {
  for (var propName in JsonObj) {
    if (JsonObj[propName] === null || JsonObj[propName] === undefined || JsonObj[propName] === '') {
      delete JsonObj[propName];
    }
  }
  return JsonObj;
};

/**
 * Returns ISO 3166-1 alpha-2 code based on ISO 3166-1 alpha-3 code.
 */
convertCountryIso3ToIso2 = function (iso) {
  if (iso) {
    for (ccCount = 0; ccCount < COUNTRIES.length; ccCount++) {
      if (COUNTRIES[ccCount].value === iso) {
        return COUNTRIES[ccCount].iso2;
      }
    }
  } else {
    return null;
  }
};

/**
 * Returns country name based on ISO 3166-1 alpha-3 code.
 */
convertCountryCode = function (iso) {
  if (iso) {
    for (ccCount = 0; ccCount < COUNTRIES.length; ccCount++) {
      if (COUNTRIES[ccCount].value === iso) {
        return COUNTRIES[ccCount].text;
      }
    }
  } else {
    return null;
  }
};

/**
 * Returns country flag based on ISO 3166-1 alpha-3 code.
 */
getCountryFlag = function (iso) {
  if (iso) {
    for (ccCount = 0; ccCount < COUNTRIES.length; ccCount++) {
      if (COUNTRIES[ccCount].value === iso) {
        return COUNTRIES[ccCount].flag;
      }
    }
    return 0;
  } else {
    return null;
  }
};

/**
 * Returns string date in requested date format.
 * @param {string} strDate - The date as string.
 * @param {string} format - The format of the date to return, e.g. "DD/MM/YYYY"
 */
dateConvert = function (strDate, format) {
  if (strDate) {
    let date = new Date(strDate);
    let momentObj = moment(date.toUTCString());

    if (momentObj.isValid()) {
      return momentObj.utcOffset(0).format(format);
    } else {
      return null;
    }
  }
  return null;
};

/**
 * Returns string date ('DD/MM/YYYY' format) as a Date object.
 * @param {string} dateStr - The date as DD/MM/YYYY string.
 * @param {string} eod - When true, the datetime will be set to end of day.
 */
stringToDate = function (dateStr, eod) {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/")
    if (eod) {
      return new Date(year, month - 1, day, 23, 59, 59)
    } else {
      return new Date(year, month - 1, day)
    }
  }
  return null;
};

/**
 * Returns 'description' attribute associated with constant object, based on value,
 * @param {string} constantsObj - The constant object to retrieve attribute from.
 * @param {string} value - The value key.
 */
getDescriptionFromValue = function (constantsObject, value) {
  if (!value) {
    value = '';
  }

  for (count = 0; count < constantsObject.length; count++) {
    if (constantsObject[count].value === value) {
      return constantsObject[count].description;
    }
  }
  return DEFAULT_RESOURCE_LABEL;
};

/**
 * Returns 'text' attribute associated with constant object, based on value,
 * @param {string} constantsObj - The constant object to retrieve attribute from.
 * @param {string} value - The value key.
 */
getTextFromValue = function (constantsObject, value) {
  if (!value) {
    value = '';
  }
  for (count = 0; count < constantsObject.length; count++) {
    if (constantsObject[count].value === value) {
      return constantsObject[count].text;
    }
  }
  return DEFAULT_RESOURCE_LABEL;
};

encode = function (input) {
  let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
    chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

/**
 * Activate spinner for ibox containers with id 'ibox1'
 */
activateSpinner = function () {
  if (!$('#ibox1').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
  }
  if (!$('#ibox2').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
  }
  if (!$('#ibox3').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox3').children('.ibox-content').toggleClass('sk-loading');
  }
  if (!$('#ibox4').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox4').children('.ibox-content').toggleClass('sk-loading');
  }
  if (!$('#documentViewModal').children('.ibox-content').hasClass('sk-loading')) {
    $('#documentViewModal').children('.ibox-content').toggleClass('sk-loading');
  }
};

activateSpinner1 = function () {
  if (!$('#ibox1').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
  }
};

activateSpinner2 = function () {
  if (!$('#ibox2').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
  }
};

activateSpinner3 = function () {
  if (!$('#ibox3').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox3').children('.ibox-content').toggleClass('sk-loading');
  }
};

activateSpinner4 = function () {
  if (!$('#ibox4').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox4').children('.ibox-content').toggleClass('sk-loading');
  }
};

/**
 * Toggles spinner.
 * Note - this method is identical to activateSpinner(), it's only used for code 
 * readbility purposes
 */

deactivateSpinner = function () {
  if ($('#ibox1').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
  }
  if ($('#ibox2').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
  }
  if ($('#ibox3').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox3').children('.ibox-content').toggleClass('sk-loading');
  }
  if ($('#ibox4').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox4').children('.ibox-content').toggleClass('sk-loading');
  }
  if ($('#documentViewModal').children('.ibox-content').hasClass('sk-loading')) {
    $('#documentViewModal').children('.ibox-content').toggleClass('sk-loading');
  }
};

deactivateSpinner1 = function () {
  if ($('#ibox1').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
  }
};

deactivateSpinner2 = function () {
  if ($('#ibox2').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
  }
};

deactivateSpinner3 = function () {
  if ($('#ibox3').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox3').children('.ibox-content').toggleClass('sk-loading');
  }
};

deactivateSpinner4 = function () {
  if ($('#ibox4').children('.ibox-content').hasClass('sk-loading')) {
    $('#ibox4').children('.ibox-content').toggleClass('sk-loading');
  }
};

/**
 * Returns true if two strings are matching, otherwise false.
 */
isEqual = function (str1, str2) {
  if (str1 && str2) {
    return str1.toString().toLowerCase() === str2.toString().toLowerCase();
  }
  return null;
};

isLess = function (number1, number2) {
  return Number(number1) < Number(number2);
};

add = function (number1, number2) {
  return Number(number1) + Number(number2);
};

/**
 * Returns logical AND boolean value for an array of strings. 
 */
and = function (array) {
  var args = Array.prototype.slice.call(array); // exclude key=value args
  return _.every(args, function (arg) {
    return !arg;
  });
}

/**
 * Returns string in title case, e.g. "john doe" will be returned "John Doe".
 */
toTitleCase = function (str) {
  if (str) {
    str = str.replace(/_/g, ' ');
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return null;
  }
}

/**
 * Returns comma-separated string from array, while excluding nulls.
 */
commaSeparatedValues = function () {
  let commaSeparated = '';
  let args = Array.prototype.slice.call(arguments);

  _.every(args, function (arg) {
    commaSeparated = $.grep(_.values(arg), Boolean).join(", ");
  });
  return commaSeparated;
};

/**
 * Returns comma-separated string from array, while replacing last comma with 'and'.
 */
toSentence = function (array) {
  let stringList = [];
  let listSentence = '';

  if (array instanceof Array) {
    _.each(array, function (value) {
      stringList.push(getTextFromValue(DISPLAY_TEXT, value));
    })
    listSentence = commaSeparatedValues(stringList);
    listSentence = listSentence.replace(/,(?=[^,]+$)/, ' and');
  } else {
    listSentence = getTextFromValue(DISPLAY_TEXT, array);
  }

  return listSentence;
};

returnIf = function (str1, str2, returnText) {
  if (str1.toString().toLowerCase() === str2.toString().toLowerCase()) {
    return returnText;
  }
  return '';
};

monthName = function (month) {
  if (month) {
    let monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return monthNames[month - 1];
  }
  return null;
};

countArray = function (array) {
  if (array) {
    return array.length;
  }
  return 0;
};


truncateByNumberOfChars = function (str, num) {
  if (str) {
    if (str.length >= num) {
      return str.substring(0, num) + '...';
    } else {
      return str;
    }
  } else {
    return str;
  }
};

stringSizeLessThan = function (str, num) {
  if (str) {
    if (str.length < num) {
      return true
    } else {
      return false;
    }
  } else {
    return false;
  }
};

removeDuplicates = function (myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}