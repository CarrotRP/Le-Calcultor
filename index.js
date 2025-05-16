const button_parent = document.querySelector('.buttons')
const display = document.querySelector('.display input')

let a = ''; //first number
let b = ''; //second number
let op = ''; //operator
let doReset = false; //reset the screen to ""

button_parent.addEventListener('click', e => {
    if (e.target.matches('button')) {
        //numbers and period(.)
        //set the max length of the display
        if(display.value.length < 13){
            //check if the button presses is a number, or the period
            if (!isNaN(e.target.innerHTML) || e.target.innerHTML == ".") {
                //check if display == '0', so that if a number is pressed, it doesnt go '01'
                if (display.value == '0' || doReset) {
                    //check if the button is pressed isnt '.' and the value isnt '0.'
                    if (!(e.target.innerHTML == ".") && display.value != '0.') {
                        display.value = "";
                        doReset = false;
                    }
                }
    
                //check whether the period(.) is not added (-1 mean there's no '.' in the display value)
                if (display.value.indexOf('.') == -1) {
                    display.value += e.target.innerHTML;
                } else if (e.target.innerHTML != ".") {
                    display.value += e.target.innerHTML;
                }
    
                document.querySelector('button:nth-child(1)').innerHTML = 'C';
            }
        }

        //symbols functions
        switch (e.target.innerHTML) {
            case 'AC':
            case 'C':
                display.value = "0";
                e.target.innerHTML = 'AC';
                op = '';
                a = '';
                b = '';
                break;
            case '±':
                display.value = -(display.value)
                break;
            case '%':
                display.value /= 100;
                break;
            case '÷':
                operation('/');
                break;
            case '×':
                operation('*');
                break;
            case '−':
                operation('-');
                break;
            case '+':
                operation('+');
                break;
            case '=':
                calculate();
                break;
        }
    }
})

function calculate(){
    b = parseFloat(display.value);
    let result;

    switch(op){
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            //0 trailing
            //js float being js float
            result = (a * b).toFixed(11);
            break;
        case '/':
            try{
                result = a / b;
                //format result
                result = result.toFixed(11)
                // if b = 0, can't divide by 0
                if(b == 0){
                    throw new Error('Error')
                }
            } catch(e){
                result = 'Error'
            }
            break;
    }
    display.value = result;
    op = '';

}

function operation(selected_op){
    if(op != ''){
        calculate();
    }
    a = parseFloat(display.value);
    op = selected_op;

    doReset = true;
}