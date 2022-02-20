'use strict';


// Attach listeners to form
function readyForm(id) {
  var form = document.getElementById(id);
  if (form !== null) {
    form.addEventListener('submit', onSubmit, false);
    toggleForm(form, 'enabled');
  }
}


// Check is required fileds are not empty before submitting
function onSubmit(event) {
  var form;
  var requiredFields, fieldIndex;

  form = event.target;
  requiredFields = form.querySelectorAll('[required]');

  event.preventDefault();
  event.stopPropagation();

  for (fieldIndex = 0; fieldIndex < requiredFields.length ; fieldIndex++) {
    if (validateInput(requiredFields[fieldIndex]) === false) {
      form.classList.add('was-validated');
      return;
    }
  }

  submitForm(event);
}


// Called for each input when losing focus or change events
function validateInput(rawInput) {
  var input = $(rawInput);
  if (input.val() === '') {
    toggleDanger(rawInput, true);
    return false;
  }
  toggleDanger(rawInput, false);
  return true;
}


function submitForm(event) {
  var form = $(event.target);
  var formAction = form.attr('action');
  var formData = form.serialize();
  var formButton = $('[type=submit]', form);
  var formButtonText = formButton.text();
  var alert = $('.alert', form);
  var pageLang = $('html').attr('lang');
  var strings = {
    alertSuccess: {
      ar: 'شكراً. لقد تم استلام رسالتك بنجاح.',
      en: 'Thank you. Your message was delivered successfully'
    },
    alertInputError: {
      ar: 'بعض المعلومات غير مكتملة او غير صحيحة',
      en: 'Some fields are missing or incorrect'
    },
    alertServerError: {
      ar: 'حدث خطاء بالخادم. الرجاء التواصل معنا عير بريدنا الالكتروني',
      en: 'There was a server error. Please contact us by email.'
    },
    submitButton: {
      ar: '...جاري الارسال',
      en: 'Sending...'
    }
  };

  if (alert.length > 0) {
    alert.remove();
  }

  alert = $('<div class="alert alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');

  toggleForm(form, 'disabled');
  formButton.text(strings.submitButton[pageLang]);

  $.post({
    url: formAction,
    data: formData,
    dataType: 'json'
  })

  .done(function handleSubmitDone() {
    alert.addClass('alert-success');
    alert.append(strings.alertSuccess[pageLang]);
  })

  .fail(function handleSubmitFail(jqXHR) {
    var responseJSON = jqXHR.responseJSON;
    alert.addClass('alert-danger');
    if (responseJSON !== undefined && Array.isArray(responseJSON.errorFields)) {
      alert.append(strings.alertInputError[pageLang]);
      responseJSON.errorFields.forEach(function applyDanger(fieldData) {
        var field = $('[name=' + fieldData.name + ']', form);
        toggleDanger(field, true, fieldData.error[pageLang]);
      });
    } else {
      alert.append(strings.alertServerError[pageLang]);
    }
  })

  .always(function enableFormAfterSubmit() {
    form.prepend(alert);
    formButton.text(formButtonText);
    toggleForm(form, 'enabled');
  });
}


// Enable and disable the form controls
function toggleForm(rawForm, state) {
  var form = $(rawForm);
  if (state === 'enabled') {
    $('[name], [type=submit]', form).removeAttr('disabled');
  } else {
    $('[name], [type=submit]', form).attr('disabled', 'true');
  }
}


function toggleDanger(rawInput, state, message) {
  var input = $(rawInput);
  var feedbackClass = 'form-control-feedback';
  var feedbackMessage = input.data('feedback');
  var feedbackDiv = $('<div></div>')
    .addClass(feedbackClass)
    .text(message || feedbackMessage);

  if (state === true) {
    input.addClass('is-invalid');
    if ($('.' + feedbackClass, input.parent()).length === 0) {
      //input.parent().append(feedbackDiv);
    }
  } else {
    input.removeClass('is-invalid');
    //$('.' + feedbackClass, input.parent()).remove();
  }
}


readyForm('contactForm');