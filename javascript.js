const billInput = document.getElementById('billInput');
const peopleInput = document.getElementById('peopleInput');
const tipButtons = document.querySelectorAll('.labels');
const customTip = document.getElementById('customTip');
const tipPerPerson = document.getElementById('tipPerPerson');
const totalPerPerson = document.getElementById('totalPerPerson');
const resetBtn = document.getElementById('resetBtn');

let bill = 0;
let people = 1;
let tipPercent = 0;

function calculate() {
    if (people < 1) {
        tipPerPerson.textContent = '$0.00';
        totalPerPerson.textContent = '$0.00';
        return;
    }
    const tip = bill * tipPercent / 100;
    const tipEach = people ? tip / people : 0;
    const totalEach = people ? (bill + tip) / people : 0;
    tipPerPerson.textContent = '$' + tipEach.toFixed(2);
    totalPerPerson.textContent = '$' + totalEach.toFixed(2);
}

billInput.addEventListener('input', () => {
    bill = parseFloat(billInput.value) || 0;
    calculate();
});

peopleInput.addEventListener('input', () => {
    people = parseInt(peopleInput.value) || 1;
    calculate();
});

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tipButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tipPercent = parseFloat(btn.dataset.tip);
        customTip.value = '';
        calculate();
    });
});

customTip.addEventListener('input', () => {
    tipButtons.forEach(b => b.classList.remove('active'));
    tipPercent = parseFloat(customTip.value) || 0;
    calculate();
});

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTip.value = '';
    tipButtons.forEach(b => b.classList.remove('active'));
    bill = 0;
    people = 1;
    tipPercent = 0;
    tipPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
});