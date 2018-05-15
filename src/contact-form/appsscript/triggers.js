function reply(object) {
  var response;
  response = ContentService.createTextOutput(JSON.stringify(object));
  response.setMimeType(ContentService.MimeType.JAVASCRIPT);
  return response;
}

function doPost(e) {
  var errors = [];
  var mailgun = Mailgun('key-8fb9e5e80cf33ecdc0c328a9ee19420c');
  var emailAddressIsValid, emailIsQueued;
  var parameters = e.parameter;
  var contentLength = e.contentLength;
  var postType = e.postData.type;
  var postContents = e.postData.contents;

  // (-1) indicates a GET request
  if (contentLength === 0 || contentLength === -1) {
    return reply({
      error: 'Bad request'
    });
  }

  // This is a hidden form filed called 'subject' used for catching bots
  if (parameters['subject'] !== '') {
    return reply({
      error: 'Unauthorized'
    });
  }

  if (parameters.email === undefined) {
    errors.push({
      name: 'email',
      error: {
        ar: 'الرجاء ادخال بريدك الالكتروني',
        en: 'Please enter your message'
      }
    });
  }

  if (parameters.message === undefined) {
    errors.push({
      name: 'message',
      error: {
        ar: 'الرجاء ادخال رسالتك',
        en: 'Please enter your message'
      }
    });
  }

  if (errors.length !== 0) {
    return reply({
      error: 'بعض المعلومات غير مكتملة او صحيحة',
      errorFields: errors
    });
  }

  emailAddressIsValid = mailgun.validateAddress(parameters.email);
  if (emailAddressIsValid === false) {
    if (!error && response.statusCode === 200) {
      if (body.is_valid === false) {
        errorFields.push({
          name: 'email',
          error: {
            ar: 'الرجاء التأكد من صلاحية بريدك الالكتروني',
            en: 'Please confirm your email address'
          }
        });

        return reply({
          error: 'بعض المعلومات غير مكتملة او صحيحة',
          errorFields: errors
        });
      }
    }
  }

  emailIsQueued = mailgun.sendEmail('gsuite@iceweb.co', {
    fromName: parameters.name,
    fromEmail: 'notify@iceweb.co', // Must be added & verified in mailgun
    replyTo: parameters.email,
    message: parameters.message,
  });

  if (emailIsQueued === false) {
    return reply({
      error: 'حدث خطاء بالخادم. الرجاء التواصل معنا عير بريدنا الالكتروني'
    })
  } else {
    return reply({});
  }
}
