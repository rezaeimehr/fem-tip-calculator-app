const billInputEl = document.querySelector('#bill')
const customTipInputEl = document.querySelector('#select-tip')
const numberOfPeopleEl = document.querySelector('.calculator__num-of-people')
const numberOfPeopleInputEl = document.querySelector('#number-of-people-input')
const tipPercentElements = document.querySelectorAll('.calculator__tip-percent')
const resetButtonEl = document.querySelector('#reset-btn')
const eachPersonTipAmountEl = document.querySelector('#tip-amount-each-person')
const eachPersonTotalBillAmountEl = document.querySelector(
  '#total-bill-amount-each-person'
)

billInputEl.addEventListener('input', handleBillInput)
customTipInputEl.addEventListener('input', handleCustomTipInput)
numberOfPeopleInputEl.addEventListener('input', handleNumberOfPeopleInput)
tipPercentElements.forEach(item =>
  item.addEventListener('click', handleTipPercentClick)
)
resetButtonEl.addEventListener('click', handleResetButtonClick)

let bill = null
let tipPercent = null
let numberOfPeople = null

function clearTipPercentElements() {
  tipPercentElements.forEach(item => {
    item.classList.remove('calculator__tip-percent--active')
  })
  tipPercent = null
}

function clearTipAndTotalAmounts() {
  eachPersonTipAmountEl.textContent = '$0.00'
  eachPersonTotalBillAmountEl.textContent = '$0.00'
}

function handleBillInput() {
  bill = parseInt(billInputEl.value)

  caclulate()
}

function handleTipPercentClick(event) {
  if (customTipInputEl.value !== '') customTipInputEl.value = ''

  const el = event.currentTarget
  clearTipPercentElements()
  el.classList.add('calculator__tip-percent--active')
  tipPercent = parseInt(el.getAttribute('data-tip-percent'))

  caclulate()
}

function handleCustomTipInput(event) {
  if (event && event.currentTarget === customTipInputEl) {
    clearTipPercentElements()
    tipPercent = parseInt(customTipInputEl.value)
  }

  caclulate()
}

function handleNumberOfPeopleInput() {
  numberOfPeople = parseInt(numberOfPeopleInputEl.value)

  numberOfPeople === 0
    ? numberOfPeopleEl.classList.add('calculator__num-of-people--error')
    : numberOfPeopleEl.classList.remove('calculator__num-of-people--error')

  caclulate()
}

function handleResetButtonClick() {
  bill = null
  tipPercent = null
  numberOfPeople = null

  billInputEl.value = ''
  customTipInputEl.value = ''
  numberOfPeopleInputEl.value = ''

  clearTipPercentElements()
  clearTipAndTotalAmounts()
  disableResetButton()
}

function enableResetButton() {
  if (resetButtonEl.disabled) resetButtonEl.removeAttribute('disabled')
}

function disableResetButton() {
  if (!resetButtonEl.disabled) resetButtonEl.disabled = true
}

function caclulate(event) {
  enableResetButton()
  if (!bill || bill < 1) return
  if (!tipPercent || tipPercent < 1) return
  if (!numberOfPeople || numberOfPeople < 1) return

  const eachPersonTipAmount = (
    (bill * tipPercent) /
    100 /
    numberOfPeople
  ).toFixed(2)

  const eachPersonTotalBillAmount = (
    bill / numberOfPeople +
    parseInt(eachPersonTipAmount)
  ).toFixed(2)

  eachPersonTipAmountEl.textContent = `$${eachPersonTipAmount}`
  eachPersonTotalBillAmountEl.textContent = `$${eachPersonTotalBillAmount}`
}
