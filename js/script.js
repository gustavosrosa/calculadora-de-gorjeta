const inputValueElement = document.querySelector("#valConta");
const optionsElement = document.querySelector("#optionsQuality");
const calcBtn = document.querySelector("#calc");
const valTipElement = document.querySelector("#valTip");
const valTotElement = document.querySelector("#valTot");

inputValueElement.addEventListener("keyup", (event) => {

    let validatorMoney = formatToMoney(event.target.value);

    event.target.value = validatorMoney.value;

    valTipElement.value = "";
    valTotElement.value = ""

    calcBtn.disabled = !validatorMoney.isValidKeyUp;
});

calcBtn.addEventListener(("click"), () => {

    let valueWithoutMask = inputValueElement.value.replace("R$ ", "")
    let convertToFloatToCalc = parseFloat(realToDolar(valueWithoutMask));
    let optionSelectedTip = parseFloat(optionsElement.value);
    calcTip(convertToFloatToCalc, optionSelectedTip);
});

function formatToMoney(value) {

    let validators = initValidator();

    let monetary = value.replace(/\D/g, '');

    validators.isValidKeyUp = monetary > 0;

    monetary = convertToMoney(monetary);

    validators.value = `R$ ${monetary}`;

    return validators;
}

function convertToMoney(monetary) {

    if (monetary.length >= 7) {
        monetary = monetary.slice(0,7);
    }

    monetary = (monetary / 100).toFixed(2).replace('.', ',');
    monetary = monetary.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return monetary;

}

function calcTip(value, option) {
    let tip = roundToMonetary(value * option);
    let valuePlusTip = roundToMonetary(value + tip);
    
    valTipElement.value = dollarToReal(tip);
    valTotElement.value = dollarToReal(valuePlusTip);
}

function initValidator() {
    return {
        isValidKeyUp: false,
        value: 0.00
    }
}

function dollarToReal(value) {
    value = Number(value).toFixed(2); 
    let [inteiro, decimal] = value.split('.');
    inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${inteiro},${decimal}`;
}

function realToDolar(value) {
    value = value.replace('.', '');
    value = value.replace(',', '.');
    return value;
}

function roundToMonetary(value) {
    return parseFloat(value.toFixed(2));
}