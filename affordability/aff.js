var basicAmount = 0;
var workPlace = 'none'
var department = 'none'
var govDepartment = department;
var councilDepartment = department;
var selectedAllowances = [];
var selectionGroup = 0; //for back button allowance
var selectionGroupNewloan = 0;
var direction = true;
//var selectedAllowancesAmounts =[];
var deductionAmount = 0;
var newloanPresent = 'no';
var settleloan = 'no';
var selectedNewLoanCode = []
var selectedsettleLoanCode = []
var taxCorrection = 'no'
var taxPensionDeductions = [0,0];
var maritalStatusValue = 'no'
var birthdate = 0;


const containerDiv = document.querySelector('.container');
createBasicDiv()
var currentDiv = ''
var current = ''

document.getElementById('next').addEventListener('click',()=>{
    direction = true;
    currentDiv = containerDiv.firstElementChild.className.split(' ')[0]
    current = document.getElementById(currentDiv)
    if(basicAmount <= 0 ){
        showNotification('basic amount cannot be 0 or less')
        triggerShakeEffect()
        return;
    }else if (selectedNewLoanCode.length == 0 && currentDiv === 'newloanPresentSelection') {
        showNotification('please SELECT a new loan')
        triggerShakeEffect()
        return;
    }else if(hasZeroValue(NewLoanInputs) && currentDiv === 'selectedBoxNewloan'){
        showNotification('please enter New loan installent')
        triggerShakeEffect()
        return;
     }else if (selectedsettleLoanCode.length == 0 && currentDiv === 'settleloanPresentSelection') {
        showNotification('please SELECT a loan you want to SETTLE')
        triggerShakeEffect()
      return;
    }
    current.classList.add('shrink');
    setTimeout(() => {
        switch (currentDiv) {
            case 'basic':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('basic'));
                createWorkDiv()
                break;
            case 'workPlace':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                if (workPlace === 'government') {
                    createGovDepartmentDiv()
                } else {
                    createCouncilDepartmentDiv()
                }
                break;
            case 'department':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                switch (department) {
                    case 'bdf':
                        bdfAllowanceSelection()
                        selectionGroup = 1;
                        break;
                    case 'police':
                    
                        break;
                    case 'education':
                    
                        break;
                    default:
                        break;
                }
                break;
            case 'allowance':
                if (!containerDiv.contains(current)) {
                    break;             
                 }else if(selectedAllowances.length == 0 ) {
                    showNotification('No permanent Alowances selected')
                    containerDiv.removeChild(current);
                    createDeductionDiv()
                    break;
                 }
                containerDiv.removeChild(current);
                createNumberInputs(selectedAllowances)
                break;
            case 'selectedBox':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                createDeductionDiv()
                break;
            case 'deduction':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                createNewloanDiv()
                break;
            case 'newloanPresent':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                if (newloanPresent === 'yes') {
                    createLoanCodesOption()
                } else {
                    createSettleLoanDiv()
                }
                break;
            case 'newloanPresentSelection':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                createNumberInputsNewloan(selectedNewLoanCode)
                break;
            case 'selectedBoxNewloan':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                createSettleLoanDiv()
                break;
            case 'oldloanSettle':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                if (settleloan === 'yes') {
                    createSettleLoanCodesOption()
                } else {
                    createTaxOption()
                }
                break;
            case 'settleloanPresentSelection':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                 
                containerDiv.removeChild(current);
                createNumberInputsSettleloan(selectedsettleLoanCode)
                break;
            case 'selectedBoxSettleloan':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                createNumberInputsSettleloanBalances(selectedsettleLoanCode)
                break;
            case 'selectedBoxSettleloanBalance':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                createTaxOption()
                break;
            case 'taxDiv':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                if (taxCorrection === 'yes') {
                    createTaxCorrectionInputs()
                }else {
                    maritalStatus()
                }
                break;
            case 'taxDivInput':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                maritalStatus()
                break;
            case 'maritalDiv':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(current);
                getAge()
                console.log(calculateMaxInstallment())
                break;
            default:
                break;
        }
    }, 500);

})
document.getElementById('back').addEventListener('click',()=>{
    direction = false;
    currentDiv = containerDiv.firstElementChild.className.split(' ')[0]
    current = document.getElementById(currentDiv)
    if (current.classList[0] === 'basic') {
        return;
    }
    current.classList.add('shrink');
    setTimeout(() => {
        switch (currentDiv) {
            case 'workPlace':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('workPlace'));
                createBasicDiv()
                break;
            case 'department':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('department'));
                createWorkDiv()
                break;
            case 'allowance':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('allowance'));
                if (workPlace === 'government') {
                    createGovDepartmentDiv()
                } else {
                    createCouncilDepartmentDiv()
                }
                break;
            case 'selectedBox':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('selectedBox'));
                if (selectionGroup == 1) {
                    bdfAllowanceSelection()
                } else {
                    
                }
                break;
            case 'deduction':
                if (!containerDiv.contains(current)) {
                    break;             
                 }                
                 containerDiv.removeChild(document.getElementById('deduction'));
                if (selectedAllowances.length == 0 && workPlace === 'government') {
                    createGovDepartmentDiv()
                }else if(selectedAllowances.length == 0 && workPlace === 'council'){
                    createCouncilDepartmentDiv()
                }else{
                    createNumberInputs(selectedAllowances)
                }
                break;
            case 'newloanPresent':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('newloanPresent'));
                createDeductionDiv()
                break;
            case 'newloanPresentSelection':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('newloanPresentSelection'));
                createNewloanDiv()
                break;
            case 'selectedBoxNewloan':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('selectedBoxNewloan'));
                createLoanCodesOption()            
                break;
            case 'oldloanSettle':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('oldloanSettle'));
                if (newloanPresent === 'yes') {
                    createNumberInputsNewloan(selectedNewLoanCode)
                } else {
                    createNewloanDiv()
                }
                break;
            case 'settleloanPresentSelection':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('settleloanPresentSelection'));
                createSettleLoanDiv()
                break;
            case 'selectedBoxSettleloan':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('selectedBoxSettleloan'));
                createSettleLoanCodesOption()
                break;
            case 'selectedBoxSettleloanBalance':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('selectedBoxSettleloanBalance'));
                createNumberInputsSettleloan(selectedsettleLoanCode)
                break;
            case 'taxDiv':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('taxDiv'));
                if (settleloan === 'yes') {
                    createNumberInputsSettleloanBalances(selectedsettleLoanCode)
                } else {
                    createSettleLoanDiv()
                }
                break;
            case 'taxDivInput':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('taxDivInput'));
                createTaxOption()
                break;
            case 'maritalDiv':
                if (!containerDiv.contains(current)) {
                    break;             
                 }
                containerDiv.removeChild(document.getElementById('maritalDiv'));
                if (taxCorrection === 'yes') {
                    createTaxCorrectionInputs()
                } else {
                    createTaxOption()
                }
                break;
            case 'birthdateDiv':
                if (!containerDiv.contains(current)) {
                    break;             
                }
                containerDiv.removeChild(document.getElementById('birthdateDiv'));
                maritalStatus()
                break;
            default:
                break;
        }
    }, 500);
})
function hasZeroValue(obj) {
    // Iterate over the values of the object
    for (let key in obj) {
        if (obj[key] === 0 || obj[key] === '0' ||obj[key] === '') {
            return true; // Return true if a value is 0
        }
    }
    return false; // Return false if no value is 0
}
function showNotification(text) {
    const notification = document.getElementById('notification');
    notification.textContent = text;
        notification.classList.add('show');
    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
function triggerShakeEffect() {
    const div = document.getElementById('container');
    div.classList.add('shake');

    // Remove the shake class after the animation completes
    div.addEventListener('animationend', () => {
        div.classList.remove('shake');
    }, { once: true });
}


function createBasicDiv() {

    
    // Create the basic div
    const basicDiv = document.createElement('div');
    basicDiv.className = 'basic';
    basicDiv.id = 'basic';

    // Create the label
    const label = document.createElement('label');
    label.setAttribute('for', 'amountBasic');
    label.textContent = 'Enter your BASIC SALARY (payslip)';

    // Create the input
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'amountBasic');
    input.className = 'amountBasic';

    // Append the label and input to the basic div
    basicDiv.appendChild(label);
    basicDiv.appendChild(input);
    containerDiv.appendChild(basicDiv)

    // Update basicAmount whenever the input value changes
    document.getElementById('amountBasic').addEventListener('input', (event) => {
        basicAmount = event.target.value;
    });

    if (document.getElementById('amountBasic').value != null) {
        document.getElementById('amountBasic').value = basicAmount;
    } else {
        document.getElementById('amountBasic').value = 0
    }

    
    if (direction) {
        basicDiv.classList.add('slide-in-right');
    } else {
        basicDiv.classList.add('slide-in-left');
    }
}
function createWorkDiv() {
    const workDiv = document.createElement('div')
    workDiv.className = 'workPlace'
    workDiv.id = 'workPlace'
    workDiv.textContent = 'Select your place of WORK?'
    workDiv.style.width = '90%'

    // Create the first radio input for Government
    const optDiv = document.createElement('div')
    optDiv.className = 'govSub'
    const governmentInput = document.createElement('input');
    governmentInput.setAttribute('type', 'radio');
    governmentInput.setAttribute('name', 'workplace');
    governmentInput.setAttribute('id', 'government');
    governmentInput.setAttribute('value', 'government');
    const governmentLabel = document.createElement('label');
    governmentLabel.setAttribute('for', 'government');
    governmentLabel.textContent = 'Government';
    optDiv.appendChild(governmentInput)
    optDiv.appendChild(governmentLabel)
    


    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='councilSub'
    const councilInput = document.createElement('input');
    councilInput.setAttribute('type', 'radio');
    councilInput.setAttribute('name', 'workplace');
    councilInput.setAttribute('id', 'council');
    councilInput.setAttribute('value', 'council');
    const councilLabel = document.createElement('label');
    councilLabel.setAttribute('for', 'council');
    councilLabel.textContent = 'Council/Landboard';
    opt2.appendChild(councilInput)
    opt2.appendChild(councilLabel)


    // Append the radio inputs before the labels to the parent div
    workDiv.appendChild(optDiv);
    workDiv.appendChild(opt2);

    containerDiv.appendChild(workDiv)

    // Add change event listeners to the radio buttons
    governmentInput.addEventListener('change', (event)=>{
        workPlace = event.target.value;
    });
    councilInput.addEventListener('change', (event)=>{
        workPlace = event.target.value;
    });

    // Set initial value for checked
    if (workPlace === 'none' || workPlace === 'government') {
        governmentInput.setAttribute('checked', 'government');
        workPlace = 'government'
    } else {
        councilInput.setAttribute('checked','council')
    }
    if (direction) {
        workDiv.classList.add('slide-in-right');
    } else {
        workDiv.classList.add('slide-in-left');
    }

}
function createGovDepartmentDiv() {
    

    const departmentDiv = document.createElement('div')
    departmentDiv.className = 'department'
    departmentDiv.id = 'department'
    departmentDiv.textContent = 'Select your DEPARTMENT?'
    departmentDiv.style.width = '90%'

    // Create the first radio input for Government
    const optDiv = document.createElement('div')
    optDiv.className = 'bdfSub'
    const bdfInput = document.createElement('input');
    bdfInput.setAttribute('type', 'radio');
    bdfInput.setAttribute('name', 'department');
    bdfInput.setAttribute('id', 'bdf');
    bdfInput.setAttribute('value', 'bdf');
    const bdfLabel = document.createElement('label');
    bdfLabel.setAttribute('for', 'bdf');
    bdfLabel.textContent = 'BDF';
    optDiv.appendChild(bdfInput)
    optDiv.appendChild(bdfLabel)
    


    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='policeSub'
    const policeInput = document.createElement('input');
    policeInput.setAttribute('type', 'radio');
    policeInput.setAttribute('name', 'department');
    policeInput.setAttribute('id', 'police');
    policeInput.setAttribute('value', 'police');
    const policeLabel = document.createElement('label');
    policeLabel.setAttribute('for', 'police');
    policeLabel.textContent = 'Police';
    opt2.appendChild(policeInput)
    opt2.appendChild(policeLabel)

    // Create the second radio input for Council
    const opt3 = document.createElement('div')
    opt3.className ='educationSub'
    const educationInput = document.createElement('input');
    educationInput.setAttribute('type', 'radio');
    educationInput.setAttribute('name', 'department');
    educationInput.setAttribute('id', 'education');
    educationInput.setAttribute('value', 'education');
    const educationLabel = document.createElement('label');
    educationLabel.setAttribute('for', 'education');
    educationLabel.textContent = 'Education';
    opt3.appendChild(educationInput)
    opt3.appendChild(educationLabel)


    // Append the radio inputs before the labels to the parent div
    departmentDiv.appendChild(optDiv);
    departmentDiv.appendChild(opt2);
    departmentDiv.appendChild(opt3);

    containerDiv.appendChild(departmentDiv)

    // Add change event listeners to the radio buttons
    bdfInput.addEventListener('change', (event)=>{
        department = event.target.value;
        govDepartment = department;
    });
    policeInput.addEventListener('change', (event)=>{
        department = event.target.value;
        govDepartment = department;

    });
    educationInput.addEventListener('change', (event)=>{
        department = event.target.value;
        govDepartment = department;
    });

    department = govDepartment;
    switch (department) {
        case 'none':
        case 'bdf':
            bdfInput.setAttribute('checked', 'bdf');
            department = 'bdf'
            break;
        case 'police':
            policeInput.setAttribute('checked', 'police');
            break;
        case 'education':
            educationInput.setAttribute('checked', 'education');
            break;
        default:
            break;
    }
    if (direction) {
        departmentDiv.classList.add('slide-in-right');
    } else {
        departmentDiv.classList.add('slide-in-left');
    }
    
}
function createCouncilDepartmentDiv() {
    const departmentDiv = document.createElement('div')
    departmentDiv.className = 'department'
    departmentDiv.id = 'department'
    departmentDiv.textContent = 'Select your DEPARTMENT?'
    departmentDiv.style.width = '90%'

    // Create the first radio input for council
    const optDiv = document.createElement('div')
    optDiv.className = 'publicOfficersSub'
    const publicOfficersInput = document.createElement('input');
    publicOfficersInput.setAttribute('type', 'radio');
    publicOfficersInput.setAttribute('name', 'department');
    publicOfficersInput.setAttribute('id', 'publicOfficers');
    publicOfficersInput.setAttribute('value', 'publicOfficers');
    const publicOfficersLabel = document.createElement('label');
    publicOfficersLabel.setAttribute('for', 'publicOfficers');
    publicOfficersLabel.textContent = 'Public Officers';
    optDiv.appendChild(publicOfficersInput)
    optDiv.appendChild(publicOfficersLabel)
    


    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='councilDeptSub'
    const councilDeptSubInput = document.createElement('input');
    councilDeptSubInput.setAttribute('type', 'radio');
    councilDeptSubInput.setAttribute('name', 'department');
    councilDeptSubInput.setAttribute('id', 'council');
    councilDeptSubInput.setAttribute('value', 'council');
    const councilDeptSubLabel = document.createElement('label');
    councilDeptSubLabel.setAttribute('for', 'council');
    councilDeptSubLabel.textContent = 'council';
    opt2.appendChild(councilDeptSubInput)
    opt2.appendChild(councilDeptSubLabel)

    // Create the second radio input for Council
    const opt3 = document.createElement('div')
    opt3.className ='landboardSub'
    const landboardInput = document.createElement('input');
    landboardInput.setAttribute('type', 'radio');
    landboardInput.setAttribute('name', 'department');
    landboardInput.setAttribute('id', 'landboard');
    landboardInput.setAttribute('value', 'landboard');
    const landboardLabel = document.createElement('label');
    landboardLabel.setAttribute('for', 'landboard');
    landboardLabel.textContent = 'landboard';
    opt3.appendChild(landboardInput)
    opt3.appendChild(landboardLabel)


    // Append the radio inputs before the labels to the parent div
    departmentDiv.appendChild(optDiv);
    departmentDiv.appendChild(opt2);
    departmentDiv.appendChild(opt3);

    containerDiv.appendChild(departmentDiv)

    // Add change event listeners to the radio buttons
    publicOfficersInput.addEventListener('change', (event)=>{
        department = event.target.value;
        councilDepartment = department;
    });
    councilDeptSubInput.addEventListener('change', (event)=>{
        department = event.target.value;
    });
    landboardInput.addEventListener('change', (event)=>{
        department = event.target.value;
    });

    department = councilDepartment;
    switch (department) {
        case 'none':
        case 'publicOfficers':
            publicOfficersInput.setAttribute('checked', 'publicOfficers');
            department = 'publicOfficers'
            break;
        case 'council':
            councilDeptSubInput.setAttribute('checked', 'council');
            break;
        case 'landboard':
            landboardInput.setAttribute('checked', 'landboard');
            break;
        default:
            break;
    }

    if (direction) {
        departmentDiv.classList.add('slide-in-right');
    } else {
        departmentDiv.classList.add('slide-in-left');
    }
}
function bdfAllowanceSelection() {
  const allowance =  ['Commuted allowance','Technical allowance','BDF special Hazard',
        'Housing & Upkeep allowance','Housing allowance','Scarce skill',
        'X-Factor','Professional allowance','BDF special duty','Band Allowance',
        'Fire Fighters Overtime Allowance 30%','Horse Allowance']
    // Create the bdfAllowance div
    const bdfAllowanceDiv = document.createElement('div');
    bdfAllowanceDiv.className = 'allowance';
    bdfAllowanceDiv.id = 'allowance';
    bdfAllowanceDiv.textContent = 'Select your PERMANENT ALLOWANCES(payslip)'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    allowance.forEach((item, index) => {
        const checkboxDiv = document.createElement('div')
        checkboxDiv.className = 'checkboxDiv'
        checkboxDiv.id = `allowance${index}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `bdfAllowance${item}`;
        checkbox.name = 'allowance';
        checkbox.value = item;

        const label = document.createElement('label');
        label.htmlFor = `allowance${index}`;
        label.textContent = item;

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxDiv.appendChild(document.createElement('br'));

        newDiv.appendChild(checkboxDiv)

        checkbox.addEventListener('change', () => {
            var f = item.replace(/\s+/g, '-').toLowerCase()
            if (checkbox.checked) {
                selectedAllowances.push(checkbox.value)
                allowanceInputs[f] = 0
            } else {
                selectedAllowances = selectedAllowances.filter(item => item !== checkbox.value);
                delete allowanceInputs[f]
            }
        });

    });
    bdfAllowanceDiv.appendChild(newDiv)
    containerDiv.appendChild(bdfAllowanceDiv)
    checkalreadySelected(selectedAllowances,'bdf')

    if (direction) {
        bdfAllowanceDiv.classList.add('slide-in-right');
    } else {
        bdfAllowanceDiv.classList.add('slide-in-left');
    }
}
function checkalreadySelected(array,section) {
    array.forEach(name => {
        const checkbox = document.querySelector(`input[type="checkbox"][id="${section}Allowance${name}"]`);
        if (checkbox) {
            checkbox.checked = true; // Check the checkbox if it exists
        }
    })
}
var allowanceInputs = {}
function createNumberInputs(array) {
    const container = document.createElement('div');
    container.className = 'selectedBox'
    container.id = 'selectedBox'
    container.textContent = 'Enter ALLOWANCE AMOUNT as shown on your payslip'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    const lastIndex = array.length - 1;
    array.forEach((item, index) => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'inputWrapper';
        wrapperDiv.id = `inputWrapper${index}`;
        if(index == 0&&index == lastIndex){
            wrapperDiv.style.borderRadius = '10px'
        }else if(index == lastIndex){
            wrapperDiv.style.borderRadius = '0 0 10px 10px'
        }

        const label = document.createElement('label');
        label.htmlFor = `numberInput${index}`;
        label.textContent = item;

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `numberInput${index}`;
        numberInput.name = item.replace(/\s+/g, '-').toLowerCase(); // create a name based on the item
        numberInput.min = 0;
        numberInput.max = 900000;

        wrapperDiv.appendChild(label);
        wrapperDiv.appendChild(numberInput);

        newDiv.appendChild(wrapperDiv);

        numberInput.addEventListener('input', (event) => {
            allowanceInputs[numberInput.name] =  event.target.value;
        });
        
        if (numberInput.value != null) {
            numberInput.value = allowanceInputs[numberInput.name];
        } else {
            numberInput.value = 0
        }
    });


    container.appendChild(newDiv)
    containerDiv.appendChild(container)
    if (direction) {
        container.classList.add('slide-in-right');
    } else {
        container.classList.add('slide-in-left');
    }
}
function createDeductionDiv() {

    // Create the basic div
    const deductionDiv = document.createElement('div');
    deductionDiv.className = 'deduction';
    deductionDiv.id = 'deduction';

    // Create the label
    const label = document.createElement('label');
    label.setAttribute('for', 'amountDeduction');
    label.textContent = 'Enter your DEDUCTION amount';

    // Create the input
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'amountDeduction');
    input.className = 'amountDeduction';

    // Append the label and input to the basic div
    deductionDiv.appendChild(label);
    deductionDiv.appendChild(input);
    containerDiv.appendChild(deductionDiv)

    // Update basicAmount whenever the input value changes
    document.getElementById('amountDeduction').addEventListener('input', (event) => {
        deductionAmount = event.target.value;
        console.log(deductionAmount)
    });

    if (document.getElementById('amountDeduction').value != null) {
        document.getElementById('amountDeduction').value = deductionAmount;
    } else {
        document.getElementById('amountDeduction').value = 0
    }

    if (direction) {
        deductionDiv.classList.add('slide-in-right');
    } else {
        deductionDiv.classList.add('slide-in-left');
    }
}
function createNewloanDiv() {
    const newloanDiv = document.createElement('div')
    newloanDiv.className = 'newloanPresent'
    newloanDiv.id = 'newloanPresent'
    newloanDiv.textContent = 'Do you have a NEW LOAN that has not deducted yet?(not for loans you want to settle)'
    newloanDiv.style.width = '90%'

    // Create the first radio input for Government
    const optDiv = document.createElement('div')
    optDiv.className = 'yes'
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('name', 'newloan');
    yesInput.setAttribute('id', 'yes');
    yesInput.setAttribute('value', 'yes');
    const yesLabel = document.createElement('label');
    yesLabel.setAttribute('for', 'yes');
    yesLabel.textContent = 'yes';
    optDiv.appendChild(yesInput)
    optDiv.appendChild(yesLabel)
    


    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='no'
    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('name', 'newloan');
    noInput.setAttribute('id', 'no');
    noInput.setAttribute('value', 'no');
    const noLabel = document.createElement('label');
    noLabel.setAttribute('for', 'no');
    noLabel.textContent = 'no';
    opt2.appendChild(noInput)
    opt2.appendChild(noLabel)


    // Append the radio inputs before the labels to the parent div
    newloanDiv.appendChild(optDiv);
    newloanDiv.appendChild(opt2);

    containerDiv.appendChild(newloanDiv)

    // Add change event listeners to the radio buttons
    yesInput.addEventListener('change', (event)=>{
        newloanPresent = event.target.value;
    });
    noInput.addEventListener('change', (event)=>{
        newloanPresent = event.target.value;
    });

    // Set initial value for checked
    if (newloanPresent === 'yes') {
        yesInput.setAttribute('checked', 'yes');
    } else {
        newloanPresent = 'no'
        noInput.setAttribute('checked','no')
    }
    if (direction) {
        newloanDiv.classList.add('slide-in-right');
    } else {
        newloanDiv.classList.add('slide-in-left');
    }

}
function createLoanCodesOption() {
    const allowance =  ['boprita','bogowu','botusafe(capital bank)','botusafe(other)','TAWU',
        'letshego','bayport','BDF advance','other']

    const newloanPresentDiv = document.createElement('div');
    newloanPresentDiv.className = 'newloanPresentSelection';
    newloanPresentDiv.id = 'newloanPresentSelection';
    newloanPresentDiv.textContent = 'Select your NEW LOAN CODE'


    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    allowance.forEach((item, index) => {
        const checkboxDiv = document.createElement('div')
        checkboxDiv.className = 'checkboxDivNewloan'
        checkboxDiv.id = `newloan${index}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `newloanAllowance${item}`;
        checkbox.name = 'newloan';
        checkbox.value = item;

        const label = document.createElement('label');
        label.htmlFor = `newloan${index}`;
        label.textContent = item;

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxDiv.appendChild(document.createElement('br'));

        newDiv.appendChild(checkboxDiv)
        checkbox.addEventListener('change', () => {
            var f = item.replace(/\s+/g, '-').toLowerCase()
            if (checkbox.checked) {
                selectedNewLoanCode.push(checkbox.value)
                NewLoanInputs[f] = 0
            } else {
                selectedNewLoanCode = selectedNewLoanCode.filter(item => item !== checkbox.value);
                delete NewLoanInputs[f]
            }
        })
    })
    

    newloanPresentDiv.appendChild(newDiv)
    containerDiv.appendChild(newloanPresentDiv)
    checkalreadySelected(selectedNewLoanCode,'newloan')
    if (direction) {
        newloanPresentDiv.classList.add('slide-in-right');
    } else {
        newloanPresentDiv.classList.add('slide-in-left');
    }
}
var NewLoanInputs = {}
function createNumberInputsNewloan(array) {
    const container = document.createElement('div');
    container.className = 'selectedBoxNewloan'
    container.id = 'selectedBoxNewloan'
    container.textContent = 'Enter NEW LOAN INSTALLMENT as shown in your loan contract'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    const lastIndex = array.length - 1;
    array.forEach((item, index) => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'inputWrapperNewloan';
        wrapperDiv.id = `inputWrapperNewloan${index}`;
        if(index == 0&&index == lastIndex){
            wrapperDiv.style.borderRadius = '10px'
        }else if(index == lastIndex){
            wrapperDiv.style.borderRadius = '0 0 10px 10px'
        }

        const label = document.createElement('label');
        label.htmlFor = `numberInputNewloan${index}`;
        label.textContent = item;

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `numberInputNewloan${index}`;
        numberInput.name = item.replace(/\s+/g, '-').toLowerCase(); // create a name based on the item
        numberInput.min = 0;

        wrapperDiv.appendChild(label);
        wrapperDiv.appendChild(numberInput);

        newDiv.appendChild(wrapperDiv);

        numberInput.addEventListener('input', (event) => {
            NewLoanInputs[numberInput.name] =  event.target.value;
            console.log(NewLoanInputs)
        });
        
        if (numberInput.value != null) {
            numberInput.value = NewLoanInputs[numberInput.name];
        } else {
            numberInput.value = 0
        }

    });

    // document.getElementById(`numberInput${index}`).addEventListener('input', (event) => {
    //     selectedAllowancesAmounts.push(event.target.value);
    // });

    // if (document.getElementById(`numberInput${index}`).value != null) {
    //     document.getElementById(`numberInput${index}`).value = basicAmount;
    // } else {
    //     document.getElementById(`numberInput${index}`).value = 0
    // }
    container.appendChild(newDiv)
    containerDiv.appendChild(container)
    if (direction) {
        container.classList.add('slide-in-right');
    } else {
        container.classList.add('slide-in-left');
    }
}
function createSettleLoanDiv() {
    const settleloanDiv = document.createElement('div')
    settleloanDiv.className = 'oldloanSettle'
    settleloanDiv.id = 'oldloanSettle'
    settleloanDiv.textContent = 'Is there any loan(s) you want to SETTLE?'
    settleloanDiv.style.width = '90%'

    // Create the first radio input for Government
    const optDiv = document.createElement('div')
    optDiv.className = 'yes'
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('name', 'settleloan');
    yesInput.setAttribute('id', 'settleloan');
    yesInput.setAttribute('value', 'yes');
    const yesLabel = document.createElement('label');
    yesLabel.setAttribute('for', 'settleloan');
    yesLabel.textContent = 'yes';
    optDiv.appendChild(yesInput)
    optDiv.appendChild(yesLabel)
    


    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='no'
    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('name', 'settleloan');
    noInput.setAttribute('id', 'settleloan');
    noInput.setAttribute('value', 'no');
    const noLabel = document.createElement('label');
    noLabel.setAttribute('for', 'settleloan');
    noLabel.textContent = 'no';
    opt2.appendChild(noInput)
    opt2.appendChild(noLabel)


    // Append the radio inputs before the labels to the parent div
    settleloanDiv.appendChild(optDiv);
    settleloanDiv.appendChild(opt2);

    containerDiv.appendChild(settleloanDiv)

    // Add change event listeners to the radio buttons
    yesInput.addEventListener('change', (event)=>{
        settleloan = event.target.value;
    });
    noInput.addEventListener('change', (event)=>{
        settleloan = event.target.value;
    });

    // Set initial value for checked
    if (settleloan === 'yes') {
        yesInput.setAttribute('checked', 'yes');
    } else {
        settleloan = 'no'
        noInput.setAttribute('checked','no')
    }
    if (direction) {
        settleloanDiv.classList.add('slide-in-right');
    } else {
        settleloanDiv.classList.add('slide-in-left');
    }
}
function createSettleLoanCodesOption() {
    const allowance =  ['boprita','bogowu','botusafe(capital bank)','botusafe(other)','TAWU',
        'letshego','bayport','BDF advance','other']

    const newloanPresentDiv = document.createElement('div');
    newloanPresentDiv.className = 'settleloanPresentSelection';
    newloanPresentDiv.id = 'settleloanPresentSelection';
    newloanPresentDiv.textContent = 'Select the LOAN CODE you want to SETTLE'


    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    allowance.forEach((item, index) => {
        const checkboxDiv = document.createElement('div')
        checkboxDiv.className = 'checkboxDivSettleloan'
        checkboxDiv.id = `settleloan${index}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `settleloanAllowance${item}`;
        checkbox.name = 'settleloan';
        checkbox.value = item;

        const label = document.createElement('label');
        label.htmlFor = `settleloan${index}`;
        label.textContent = item;

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxDiv.appendChild(document.createElement('br'));

        newDiv.appendChild(checkboxDiv)
        checkbox.addEventListener('change', () => {
            var f = item.replace(/\s+/g, '-').toLowerCase()
            if (checkbox.checked) {
                selectedsettleLoanCode.push(checkbox.value)
                settleLoanInputs[f] = 0
                settleLoanBalances[f] = 0
            } else {
                selectedsettleLoanCode = selectedsettleLoanCode.filter(item => item !== checkbox.value);
                delete settleLoanInputs[f]
            }
        });
    });

    newloanPresentDiv.appendChild(newDiv)
    containerDiv.appendChild(newloanPresentDiv)
    checkalreadySelected(selectedsettleLoanCode,'settleloan')
    if (direction) {
        newloanPresentDiv.classList.add('slide-in-right');
    } else {
        newloanPresentDiv.classList.add('slide-in-left');
    }
}
var settleLoanInputs = {}
function createNumberInputsSettleloan(array){
    const container = document.createElement('div');
    container.className = 'selectedBoxSettleloan'
    container.id = 'selectedBoxSettleloan'
    container.textContent = 'Enter INSTALLMENTS for the LOAN(s) TO BE SETTLED'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    const lastIndex = array.length - 1;
    array.forEach((item, index) => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'inputWrapperSettleloan';
        wrapperDiv.id = `inputWrapperSettleloan${index}`;
        if(index == 0&&index == lastIndex){
            wrapperDiv.style.borderRadius = '10px'
        }else if(index == lastIndex){
            wrapperDiv.style.borderRadius = '0 0 10px 10px'
        }

        const label = document.createElement('label');
        label.htmlFor = `numberInputSettleloan${index}`;
        label.textContent = item;

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `numberInputSettleloan${index}`;
        numberInput.name = item.replace(/\s+/g, '-').toLowerCase(); // create a name based on the item
        numberInput.min = 0;

        wrapperDiv.appendChild(label);
        wrapperDiv.appendChild(numberInput);

        newDiv.appendChild(wrapperDiv);
        numberInput.addEventListener('input', (event) => {
            settleLoanInputs[numberInput.name] =  event.target.value;
        });
        
        if (numberInput.value != null) {
            numberInput.value = settleLoanInputs[numberInput.name];
        } else {
            numberInput.value = 0
        }

    });

    // document.getElementById(`numberInput${index}`).addEventListener('input', (event) => {
    //     selectedAllowancesAmounts.push(event.target.value);
    // });

    // if (document.getElementById(`numberInput${index}`).value != null) {
    //     document.getElementById(`numberInput${index}`).value = basicAmount;
    // } else {
    //     document.getElementById(`numberInput${index}`).value = 0
    // }
    container.appendChild(newDiv)
    containerDiv.appendChild(container)
    if (direction) {
        container.classList.add('slide-in-right');
    } else {
        container.classList.add('slide-in-left');
    }
}
var settleLoanBalances = {}
function createNumberInputsSettleloanBalances(array){
    const container = document.createElement('div');
    container.className = 'selectedBoxSettleloanBalance'
    container.id = 'selectedBoxSettleloanBalance'
    container.textContent = 'Enter your loan(s) SETTLEMENT BALANCE'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    const lastIndex = array.length - 1;
    array.forEach((item, index) => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'inputWrapperSettleloanBalance';
        wrapperDiv.id = `inputWrapperSettleloanBalance${index}`;
        if(index == 0&&index == lastIndex){
            wrapperDiv.style.borderRadius = '10px'
        }else if(index == lastIndex){
            wrapperDiv.style.borderRadius = '0 0 10px 10px'
        }

        const label = document.createElement('label');
        label.htmlFor = `inputWrapperSettleloanBalance${index}`;
        label.textContent = item;

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `inputWrapperSettleloanBalance${index}`;
        numberInput.name = item.replace(/\s+/g, '-').toLowerCase(); // create a name based on the item
        numberInput.min = 0;

        wrapperDiv.appendChild(label);
        wrapperDiv.appendChild(numberInput);

        newDiv.appendChild(wrapperDiv);
        numberInput.addEventListener('input', (event) => {
            settleLoanBalances[numberInput.name] =  event.target.value;
        });
        
        if (numberInput.value != null) {
            numberInput.value = settleLoanBalances[numberInput.name];
        } else {
            numberInput.value = 0
        }

    });

    
    container.appendChild(newDiv)
    containerDiv.appendChild(container)
    if (direction) {
        container.classList.add('slide-in-right');
    } else {
        container.classList.add('slide-in-left');
    }
}
function createTaxOption() {
    const taxDiv = document.createElement('div')
    taxDiv.className = 'taxDiv'
    taxDiv.id = 'taxDiv'
    taxDiv.textContent = 'do you have non-permanent overtime/allowance for TAX CORRECTION? '
    taxDiv.style.width = '90%'

    // Create the first radio input for Government
    const optDiv = document.createElement('div')
    optDiv.className = 'yes'
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('name', 'taxCorrection');
    yesInput.setAttribute('id', 'taxCorrection');
    yesInput.setAttribute('value', 'yes');
    const yesLabel = document.createElement('label');
    yesLabel.setAttribute('for', 'taxCorrection');
    yesLabel.textContent = 'yes';
    optDiv.appendChild(yesInput)
    optDiv.appendChild(yesLabel)

    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='no'
    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('name', 'taxCorrection');
    noInput.setAttribute('id', 'taxCorrection');
    noInput.setAttribute('value', 'no');
    const noLabel = document.createElement('label');
    noLabel.setAttribute('for', 'taxCorrection');
    noLabel.textContent = 'no';
    opt2.appendChild(noInput)
    opt2.appendChild(noLabel)


    // Append the radio inputs before the labels to the parent div
    taxDiv.appendChild(optDiv);
    taxDiv.appendChild(opt2);

    containerDiv.appendChild(taxDiv)

    // Add change event listeners to the radio buttons
    yesInput.addEventListener('change', (event)=>{
        taxCorrection = event.target.value;
    });
    noInput.addEventListener('change', (event)=>{
        taxCorrection = event.target.value;
    });

    // Set initial value for checked
    if (taxCorrection === 'none' || taxCorrection === 'no') {
        noInput.setAttribute('checked', 'no');
        taxCorrection = 'no'
    } else {
        yesInput.setAttribute('checked','yes')
    }
    if (direction) {
        taxDiv.classList.add('slide-in-right');
    } else {
        taxDiv.classList.add('slide-in-left');
    }
}
function createTaxCorrectionInputs() {
    const container = document.createElement('div');
    container.className = 'taxDivInput'
    container.id = 'taxDivInput'
    container.textContent = 'Enter your INCOME TAX and PENSION deductions as reflected in your payslip'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';
    const lastIndex = 1;
    ['Income Tax','Pension deduction'].forEach((item, index) => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'inputWrapperTax';
        wrapperDiv.id = `inputWrapperTax${index}`;
        if(index == 0&&index == lastIndex){
            wrapperDiv.style.borderRadius = '10px'
        }else if(index == lastIndex){
            wrapperDiv.style.borderRadius = '0 0 10px 10px'
        }

        const label = document.createElement('label');
        label.htmlFor = `numberInputTax${index}`;
        label.textContent = item;

        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.id = `numberInputTax${index}`;
        numberInput.name = item.replace(/\s+/g, '-').toLowerCase(); // create a name based on the item
        numberInput.min = 0;

        wrapperDiv.appendChild(label);
        wrapperDiv.appendChild(numberInput);

        newDiv.appendChild(wrapperDiv);
        numberInput.addEventListener('input', (event) => {
            taxPensionDeductions[index] =  event.target.value;
        });
        
        if (numberInput.value != null) {
            numberInput.value = taxPensionDeductions[index];
        }

    });

    container.appendChild(newDiv)
    containerDiv.appendChild(container)
    if (direction) {
        container.classList.add('slide-in-right');
    } else {
        container.classList.add('slide-in-left');
    }
}
function maritalStatus() {
    const maritalDiv = document.createElement('div')
    maritalDiv.className = 'maritalDiv'
    maritalDiv.id = 'maritalDiv'
    maritalDiv.textContent = 'Select YES if you are either MARRIED, DIRVOCED or WIDOWED'
    maritalDiv.style.width = '90%'

    // Create the first radio input for Government
    const optDiv = document.createElement('div')
    optDiv.className = 'yes'
    const yesInput = document.createElement('input');
    yesInput.setAttribute('type', 'radio');
    yesInput.setAttribute('name', 'maritalStatus');
    yesInput.setAttribute('id', 'maritalStatus');
    yesInput.setAttribute('value', 'yes');
    const yesLabel = document.createElement('label');
    yesLabel.setAttribute('for', 'maritalStatus');
    yesLabel.textContent = 'yes';
    optDiv.appendChild(yesInput)
    optDiv.appendChild(yesLabel)

    // Create the second radio input for Council
    const opt2 = document.createElement('div')
    opt2.className ='no'
    const noInput = document.createElement('input');
    noInput.setAttribute('type', 'radio');
    noInput.setAttribute('name', 'maritalStatus');
    noInput.setAttribute('id', 'maritalStatus');
    noInput.setAttribute('value', 'no');
    const noLabel = document.createElement('label');
    noLabel.setAttribute('for', 'maritalStatus');
    noLabel.textContent = 'no';
    opt2.appendChild(noInput)
    opt2.appendChild(noLabel)


    // Append the radio inputs before the labels to the parent div
    maritalDiv.appendChild(optDiv);
    maritalDiv.appendChild(opt2);

    containerDiv.appendChild(maritalDiv)

    // Add change event listeners to the radio buttons
    yesInput.addEventListener('change', (event)=>{
        maritalStatusValue = event.target.value;
    });
    noInput.addEventListener('change', (event)=>{
        maritalStatusValue = event.target.value;
    });

    // Set initial value for checked
    if (maritalStatusValue === 'no') {
        noInput.setAttribute('checked', 'no');
        maritalStatusValue = 'no'
    } else {
        yesInput.setAttribute('checked','yes')
    }
    if (direction) {
        maritalDiv.classList.add('slide-in-right');
    } else {
        maritalDiv.classList.add('slide-in-left');
    }
}
function getAge() {
    // Create the basic div
    const birthdateDiv = document.createElement('div');
    birthdateDiv.className = 'birthdateDiv'
    birthdateDiv.id = 'birthdateDiv'
    birthdateDiv.textContent = 'Enter your birthday'
        // Create the form element
        const form = document.createElement('form');
        form.className = 'birthdateForm'
       
        // Create the day select element
        const daySelect = document.createElement('select');
        daySelect.setAttribute('id', 'day');
        daySelect.setAttribute('name', 'day');
        daySelect.required = true;

        let dayOption = document.createElement('option');
        dayOption.value = '';
        dayOption.textContent = 'Day';
        daySelect.appendChild(dayOption);

        for (let i = 1; i <= 31; i++) {
            dayOption = document.createElement('option');
            dayOption.value = i;
            dayOption.textContent = i;
            daySelect.appendChild(dayOption);
        }
        form.appendChild(daySelect);

        // Create the month select element
        const monthSelect = document.createElement('select');
        monthSelect.setAttribute('id', 'month');
        monthSelect.setAttribute('name', 'month');
        monthSelect.required = true;

        let monthOption = document.createElement('option');
        monthOption.value = '';
        monthOption.textContent = 'Month';
        monthSelect.appendChild(monthOption);

        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        months.forEach((month, index) => {
            monthOption = document.createElement('option');
            monthOption.value = index + 1;
            monthOption.textContent = month;
            monthSelect.appendChild(monthOption);
        });
        form.appendChild(monthSelect);

        // Create the year select element
        const yearSelect = document.createElement('select');
        yearSelect.setAttribute('id', 'year');
        yearSelect.setAttribute('name', 'year');
        yearSelect.required = true;

        let yearOption = document.createElement('option');
        yearOption.value = '';
        yearOption.textContent = 'Year';
        yearSelect.appendChild(yearOption);

        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 16; i >= currentYear-75; i--) {
            yearOption = document.createElement('option');
            yearOption.value = i;
            yearOption.textContent = i;
            yearSelect.appendChild(yearOption);
        }
        form.appendChild(yearSelect);

        // Line break
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));

        birthdateDiv.appendChild(form)   
    containerDiv.appendChild(birthdateDiv)
    if (direction) {
        birthdateDiv.classList.add('slide-in-right');
    } else {
        birthdateDiv.classList.add('slide-in-left');
    }
}

function calculateTaxNonIndustrial() {
    var tax = 0;
    var permanentAllowance = Number(addPairs(allowanceInputs))
    var one = Math.floor(Number(basicAmount) + permanentAllowance);
    if (one > 0 && one < 7000) {
        tax = 0.05 * one
    } else if(one >=7000 && one < 10000) {
        tax = 350 + 0.125*(one - 7000)
    } else if(one >=10000 && one < 13000){
        tax = 725 + 0.1875*(one - 10000)
    } else{
        tax = 1087.50 + 0.25(one - 13000 - Number(taxPensionDeductions[1]))
    }
    return Number(taxPensionDeductions[0])-tax
}
function addPairs(obj) {
    var sum = 0;
    for (let key in obj) {
        sum += Number(obj[key])
    }
    return sum
}

function calculateMaxInstallment() {
    var permanentAllowance = Number(addPairs(allowanceInputs));
    console.log(allowanceInputs)
    var otherLoans = addPairs(NewLoanInputs);
    var adjBasicSalary = Number(basicAmount) + permanentAllowance;
    var adjNettIncome = adjBasicSalary - otherLoans - Number(deductionAmount);
    var taxx = 0;
    if(taxCorrection==='yes'){
        taxx = calculateTaxNonIndustrial();
    }
    var settleloans = addPairs(settleLoanInputs);
    var n11 = adjNettIncome + taxx + settleloans;
    var rule = 1300;
    if (basicAmount <= 9019) {
        rule = 600;
    } else if(maritalStatusValue === 'yes') {
        rule = 1500
    }
    var n13 = n11 - rule;
   return [Number(basicAmount),permanentAllowance,adjBasicSalary,Number(deductionAmount),
            otherLoans,adjNettIncome,
            taxx,settleloans,n11,rule,n13]
}