// Data storage
let people = [];
let payments = [];
let selectedPerson = null;
let selectedPayment = null;

// Add a new person
function addPerson() {
    const input = document.getElementById('personInput');
    const name = input.value.trim();

    if (!name) {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: 'Vui lòng nhập tên!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    if (people.includes(name)) {
        Swal.fire({
            icon: 'info',
            title: 'Thông báo',
            text: 'Người này đã tồn tại!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    people.push(name);
    input.value = '';
    input.focus();
    updatePeopleList();
    updatePeopleOptions();
    calculate(true);
}

// Delete selected person
function deletePerson() {
    if (selectedPerson === null) {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: 'Vui lòng chọn người để xóa!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    const person = people[selectedPerson];
    
    // Remove related payments
    payments = payments.filter(p => p.person !== person);
    
    people.splice(selectedPerson, 1);
    selectedPerson = null;
    
    updatePeopleList();
    updatePaymentsList();
    updatePeopleOptions();
    calculate(true);
}

// Update people list display
function updatePeopleList() {
    const listbox = document.getElementById('peopleList');
    
    if (people.length === 0) {
        listbox.innerHTML = '<div class="listbox-empty">Chưa có người nào</div>';
        return;
    }

    listbox.innerHTML = people.map((person, index) => 
        `<div class="listbox-item ${selectedPerson === index ? 'selected' : ''}" onclick="selectPerson(${index})">
            ${person}
        </div>`
    ).join('');
}

// Update suggestions for payment payer input
function updatePeopleOptions() {
    showPayerSuggestions();
}

// Show filtered payer suggestions
function showPayerSuggestions() {
    const input = document.getElementById('payerInput');
    const suggestions = document.getElementById('peopleSuggestions');
    const query = input.value.trim().toLowerCase();

    if (people.length === 0) {
        suggestions.innerHTML = '<div class="suggestion-empty">Chưa có người nào</div>';
        suggestions.classList.add('visible');
        return;
    }

    const filteredPeople = query
        ? people.filter(person => person.toLowerCase().includes(query))
        : people;

    if (filteredPeople.length === 0) {
        suggestions.innerHTML = '<div class="suggestion-empty">Không tìm thấy người phù hợp</div>';
        suggestions.classList.add('visible');
        return;
    }

    suggestions.innerHTML = filteredPeople
        .map(person => `<div class="suggestion-item" onclick="selectPayerSuggestion('${person.replace(/'/g, "\\'")}')">${person}</div>`)
        .join('');
    suggestions.classList.add('visible');
}

// Select payer from suggestions
function selectPayerSuggestion(name) {
    const input = document.getElementById('payerInput');
    input.value = name;
    document.getElementById('peopleSuggestions').classList.remove('visible');
    input.focus();
}

// Select person
function selectPerson(index) {
    selectedPerson = selectedPerson === index ? null : index;
    updatePeopleList();

    if (selectedPerson !== null) {
        document.getElementById('payerInput').value = people[selectedPerson];
        showPayerSuggestions();
    }
}

// Add a new payment
function addPayment() {
    const payerInput = document.getElementById('payerInput');
    const amountInput = document.getElementById('amountInput');
    
    const person = payerInput.value.trim();
    const amountText = amountInput.value.trim();
    const amount = amountText === '' ? 0 : parseFloat(amountText);

    if (!person) {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: 'Vui lòng nhập tên người!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    if (!people.includes(person)) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Người này chưa được thêm vào danh sách!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    if (isNaN(amount) || amount < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Số tiền không hợp lệ!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    payments.push({ person, amount });
    payerInput.value = '';
    amountInput.value = '';
    payerInput.focus();
    
    updatePaymentsList();
    showPayerSuggestions();
    calculate(true);
}

// Delete selected payment
function deletePayment() {
    if (selectedPayment === null) {
        Swal.fire({
            icon: 'warning',
            title: 'Cảnh báo',
            text: 'Vui lòng chọn khoản chi để xóa!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1f77b4'
        });
        return;
    }

    payments.splice(selectedPayment, 1);
    selectedPayment = null;
    
    updatePaymentsList();
    calculate(true);
}

// Update payments list display
function updatePaymentsList() {
    const listbox = document.getElementById('paymentsList');
    
    if (payments.length === 0) {
        listbox.innerHTML = '<div class="listbox-empty">Chưa có khoản chi nào</div>';
        return;
    }

    listbox.innerHTML = payments.map((payment, index) => 
        `<div class="listbox-item ${selectedPayment === index ? 'selected' : ''}" onclick="selectPayment(${index})">
            ${payment.person}: ${formatNumber(Math.round(payment.amount))}
        </div>`
    ).join('');
}

// Select payment
function selectPayment(index) {
    selectedPayment = selectedPayment === index ? null : index;
    updatePaymentsList();
}

// Format number with thousand separators
function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(Math.round(num * 1000));
}

// Calculate and display results
function calculate(isAuto = false) {
    if (people.length === 0 || payments.length === 0) {
        if (!isAuto) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng thêm người và khoản chi!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#1f77b4'
            });
        } else {
            const resultList = document.getElementById('resultList');
            resultList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Nhập dữ liệu để xem kết quả</p>';
        }
        return;
    }

    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const share = total / people.length;

    // Calculate how much each person paid
    const paid = {};
    people.forEach(p => paid[p] = 0);
    
    payments.forEach(p => {
        paid[p.person] += p.amount;
    });

    // Calculate balance
    const balance = {};
    people.forEach(p => {
        balance[p] = paid[p] - share;
    });

    // Separate creditors and debtors
    const creditors = [];
    const debtors = [];

    Object.entries(balance).forEach(([person, amount]) => {
        if (amount > 0.01) {
            creditors.push([person, amount]);
        } else if (amount < -0.01) {
            debtors.push([person, -amount]);
        }
    });

    // Match debtors with creditors
    const result = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
        const [debtor, debt] = debtors[i];
        const [creditor, credit] = creditors[j];

        const pay = Math.min(debt, credit);
        result.push({
            type: 'transaction',
            text: `${debtor} → ${creditor}: ${formatNumber(Math.round(pay))}`
        });

        debtors[i][1] -= pay;
        creditors[j][1] -= pay;

        if (debtors[i][1] < 0.01) i++;
        if (creditors[j][1] < 0.01) j++;
    }

    // Display results
    displayResults(total, share, result);
}

// Display results
function displayResults(total, share, transactions) {
    const resultList = document.getElementById('resultList');
    
    let html = '';
    
    // Summary
    html += `<div class="result-item header">Tổng cộng: ${formatNumber(Math.round(total))}</div>`;
    html += `<div class="result-item header">Mỗi người: ${formatNumber(Math.round(share))}</div>`;
    html += `<div class="result-item" style="background: transparent; border: none; padding: 6px 0;"></div>`;
    html += `<div class="result-item header">Chi tiết thanh toán:</div>`;
    
    if (transactions.length === 0) {
        html += `<div class="result-item success">Tất cả đã thanh toán công bằng!</div>`;
    } else {
        transactions.forEach(t => {
            html += `<div class="result-item transaction">  ${t.text}</div>`;
        });
    }
    
    resultList.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updatePeopleList();
    updatePaymentsList();
    updatePeopleOptions();
});

document.addEventListener('click', function(event) {
    const payerInput = document.getElementById('payerInput');
    const suggestions = document.getElementById('peopleSuggestions');

    if (!payerInput.contains(event.target) && !suggestions.contains(event.target)) {
        suggestions.classList.remove('visible');
    }
});
