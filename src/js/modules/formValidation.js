export default class FormValidation {
	static formState = {
		username: false,
		surname: false,
		day: false,
		month: false,
		year: false,
		email: false
	};

	static inputs = document.querySelectorAll("[data-modalFormInput]");

	constructor({
		submitButton,
		formInputs,
		usernameInput,
		surnameInput,
		dayInput,
		monthInput,
		yearInput,
		emailInput
	}) {
		this.submitBtn = document.querySelector(submitButton);
		this.inputs = document.querySelectorAll(formInputs);
		this.username = document.querySelector(usernameInput);
		this.surname = document.querySelector(surnameInput);
		this.day = document.querySelector(dayInput);
		this.month = document.querySelector(monthInput);
		this.year = document.querySelector(yearInput);
		this.email = document.querySelector(emailInput);
	}

	init() {
		this.username.addEventListener("input", event => {
			this.#checkInputValue(event.target, event.target.value, /^([а-яё]+|[a-z]+)$/i);
		});
		this.surname.addEventListener("input", event => {
			this.#checkInputValue(event.target, event.target.value, /^([а-яё]+|[a-z]+)$/i);
		});
		this.day.addEventListener("input", event => {
			this.#checkInputValue(event.target, event.target.value, /^(0[1-9]|[12]\d|3[01])$/gm);
		});
		this.month.addEventListener("input", event => {
			this.#checkInputValue(event.target, event.target.value, /^(0[1-9]|[1][012])$/gm);
		});
		this.year.addEventListener("input", event => {
			this.#checkInputValue(
				event.target,
				event.target.value,
				/^(19[0-9]{2}|20[0-2]{1}[0-9]{1})$/
			);
		});
		this.email.addEventListener("input", event => {
			// eslint-disable-next-line no-useless-escape
			this.#checkInputValue(
				event.target,
				event.target.value,
				// eslint-disable-next-line no-useless-escape
				/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
			);
		});
	}

	#checkInputValue(targetInput, inputValue, regExp) {
		const validationResult = regExp.test(inputValue);
		this.#changeInputStyles(targetInput, validationResult);
		const property = targetInput.getAttribute("data-input");
		FormValidation.formState = { ...FormValidation.formState, [property]: validationResult };
		this.#checkState();
	}

	#checkState() {
		switch (!Object.values(FormValidation.formState).includes(false)) {
			case true:
				this.submitBtn.disabled = false;
				this.submitBtn.style.filter = "grayscale(0)";
				break;
			case false:
				this.submitBtn.disabled = true;
				this.submitBtn.style.filter = "grayscale(100%)";
				break;
			default:
				this.submitBtn.disabled = false;
				this.submitBtn.style.filter = "grayscale(0)";
				break;
		}
	}

	static resetState() {
		// for (let value of Object.values(FormValidation.formState)) {
		//   value = false;
		//   console.log(value);
		// }
		FormValidation.formState = {
			username: false,
			surname: false,
			day: false,
			month: false,
			year: false,
			email: false
		};
		FormValidation.inputs.forEach(input => {
			input.classList.remove("StyledInput-Error");
			input.classList.remove("StyledInput-Success");
			input.style.cssText = `
        transition: border 0.3s ease-in-out;
        border: 1px solid #ccc;
        color: #333;
      `;
		});
	}

	#changeInputStyles(input, isValid) {
		switch (isValid) {
			case true:
				input.classList.remove("StyledInput-Error");
				input.classList.add("StyledInput-Success");
				input.style.cssText = `
          transition: border 0.3s ease-in-out;
          border: 2px solid #748849;
          color: #333;
        `;
				break;
			case false:
				input.classList.add("StyledInput-Error");
				input.classList.remove("StyledInput-Success");
				input.style.cssText = `
          transition: border 0.3s ease-in-out;
          border: 2px solid darkred;
          color: darkred;
        `;
				break;
			default:
				input.classList.remove("StyledInput-Error");
				input.classList.remove("StyledInput-Success");
				input.style.cssText = `
          transition: border 0.3s ease-in-out;
          border: 1px solid #ccc;
          color: #333;
        `;
				break;
		}
	}
}
