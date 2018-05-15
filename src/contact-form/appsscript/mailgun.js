function Mailgun(privateKey) {
  this._apiKey = privateKey;
}

Mailgun.prototype = {
  _apiUrl: 'https://api.mailgun.net/v3',
  _urlFetchApp: UrlFetchApp,
  _base64EncodeWebSafe: Utilities.base64EncodeWebSafe,

  validateAddress: function validateAddress(email) {
    var endPoint = '/address/private/validate';
    var queryString = '?address=' + email;
    var url = this._apiUrl + endPoint + queryString;
    var requestOptions = {};

    this._urlFetchApp.fetch(url, this._authorize(requestOptions));
  },

  sendEmail: function sendEmail(to, options) {
    var endPoint = '/notify.iceweb.co/messages';
    var url = this._apiUrl + endPoint;
    var smtp = {}
    var requestOptions = {
      method: 'post',
      payload: smtp,
    };

    // smtp is referenced inside requestOptions (pass by reference)
    smtp['to'] = to || 'info@iceweb.co';
    smtp['from'] = this._makeHeader.from(options.fromName, options.fromEmail);
    smtp['h:Reply-To'] = options.replyTo;
    smtp['subject'] = options.subject || 'Contact form';
    smtp['text'] = options.message;

    this._urlFetchApp.fetch(url, this._authorize(requestOptions));
  },

  _authorize: function authorize(requestOptions) {
    var credentials = 'api:'.concat(this._apiKey);
    var credentialsBase64 = this._base64EncodeWebSafe(credentials);
    var authHeader = 'Basic '.concat(credentials);
    requestOptions.headers['Authorization'] = authHeader;
    return requestOptions;
  },

  _makeHeader: {
    from: function constructFromHeader(senderName, senderEmail) {
      senderName = senderName || '';
      senderEmail = senderEmail || 'notify@iceweb.co';
      senderEmailEnclosed = '<' + senderEmail + '>';
      if (senderName !== '') {
        return senderName.concat(' ', senderEmailEnclosed);
      } else {
        return senderEmail;
      }
    }
  }
}
