Validator();
function Validator(formSelector) {
    function getParent(element, selector){

        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }
    var formRules = {};
    var validatorRules = {
        required: function (value) {
            return value ? undefined : `Please fill this section`;
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : `Please follow email pattern`;
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Passowrd requires at least ${min} characters`;
            }
        }
    }

    // get element in Dom
     var formElement = document.querySelector(formSelector);


    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for(var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');
                if(isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                    
                }
                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1])
                }
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // eventlistener
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            rules.find(function (rule){
                errorMessage =  rule(event.target.value);
                return errorMessage;
            });
            if(errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid')
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if(formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');

                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }

    }

    formElement.onsubmit = function (event) {
        event.preventDefault();
        
    }

}