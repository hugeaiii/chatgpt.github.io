const participants = [];
const expenses = [];

function setupTrip() {
    const namesInput = document.getElementById('participant-names');
    const names = namesInput.value.split(',').map(n => n.trim()).filter(n => n);
    if (names.length === 0) {
        alert('Please enter at least one participant');
        return;
    }
    participants.splice(0, participants.length, ...names);
    populatePayerSelect();
    document.getElementById('expense-entry').style.display = 'block';
    document.getElementById('summary').style.display = 'block';
    namesInput.disabled = true;
    document.getElementById('setup-trip').disabled = true;
}

function populatePayerSelect() {
    const payerSelect = document.getElementById('expense-payer');
    payerSelect.innerHTML = '';
    participants.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        payerSelect.appendChild(opt);
    });
}

function addExpense() {
    const date = document.getElementById('expense-date').value;
    const desc = document.getElementById('expense-desc').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const payer = document.getElementById('expense-payer').value;
    if (!date || !desc || isNaN(amount)) {
        alert('Please fill all expense fields');
        return;
    }
    expenses.push({ date, desc, amount, payer });
    document.getElementById('expense-desc').value = '';
    document.getElementById('expense-amount').value = '';
    refreshSummary();
}

function refreshSummary() {
    const output = document.getElementById('summary-output');
    const totals = {};
    participants.forEach(p => totals[p] = 0);
    expenses.forEach(exp => {
        totals[exp.payer] += exp.amount;
    });
    let text = 'Totals per person:\n';
    participants.forEach(p => {
        text += `${p}: $${totals[p].toFixed(2)}\n`;
    });
    const overall = expenses.reduce((sum, e) => sum + e.amount, 0);
    text += `\nOverall total: $${overall.toFixed(2)}\n`;
    output.textContent = text;
}

document.getElementById('setup-trip').addEventListener('click', setupTrip);
document.getElementById('add-expense').addEventListener('click', addExpense);
document.getElementById('show-summary').addEventListener('click', refreshSummary);
