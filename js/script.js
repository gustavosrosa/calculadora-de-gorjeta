const inputValueElement = document.querySelector("#valConta");
const optionsElement = document.querySelector("#optionsQuality");
const calcBtn = document.querySelector("#calc");

inputValueElement.addEventListener("keyup", (event) => {

    let validatorMoney = formatToMoney(event.target.value);

    event.target.value = validatorMoney.value;

    calcBtn.disabled = !validatorMoney.isValidKeyUp;
})

calcBtn.addEventListener(("click"), () => {

})

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

function initValidator() {
    return {
        isValidKeyUp: false,
        value: 0.00
    }
}