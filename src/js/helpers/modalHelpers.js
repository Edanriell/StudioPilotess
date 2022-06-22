function preSelectLevelOption(selector) {
	const targetOption = document.querySelector(`#${selector}`);
	targetOption.checked = true;
}

export { preSelectLevelOption };
