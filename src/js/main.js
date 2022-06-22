import "../sass/main.sass";
import Modal from "./modules/modal";
import Forms from "./modules/forms";
import FormValidation from "./modules/formValidation";
import { preSelectLevelOption } from "./helpers/modalHelpers";
import spinner from "../img/spinner.svg";

window.addEventListener("load", () => {
	const modal = new Modal({
		triggerBtns: "[data-open-modal]",
		modalSelector: ".Modal",
		modalWrapperSelector: ".Modal-Wrapper",
		showAnimationClass: "FadeInTopModal",
		hideAnimationClass: "FadeOutTopModal",
		showModalWrapperClass: "FadeInWrapper",
		hideModalWrapperClass: "FadeOutWrapper",
		closeModalTriggerBtn: "[data-single-item-modal='close-modal']",
		closeModalWindowByEsc: true,
		closeModalWindowByClickAndBtn: true,
		helperFunctions: [preSelectLevelOption]
	});

	const modalForm = new Forms({
		triggerForm: "#ModalForm",
		databaseName: "subscription",
		spinnerSrc: spinner,
		sendDataButton: "#ModalFormSendData",
		submitButton: "[data-modalFormSendData]",
		leftCoordinates: 37.5
	});

	const formValidation = new FormValidation({
		submitButton: "[data-modalFormSendData]",
		formInputs: "[data-modalFormInput]",
		usernameInput: "[data-input='username']",
		surnameInput: "[data-input='surname']",
		dayInput: "[data-input='day']",
		monthInput: "[data-input='month']",
		yearInput: "[data-input='year']",
		emailInput: "[data-input='email']"
	});

	modal.init();
	modalForm.init();
	formValidation.init();
});
