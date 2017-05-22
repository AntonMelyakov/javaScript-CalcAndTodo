(function () {
    let $parent = document.querySelector('#calculator');
    let $result = $parent.querySelector('#result');
    let $operator = '';

    let firstNumber = 0;
    let secondNumber = 0;
    let isFirst = true; // is the furst number full;
    let isInt = true; //for int or double
    let divisor = "10"; // to make int number in double number

    $parent.addEventListener('click', function (e) {
        let $el = e.target;
        let type = $el.getAttribute('data-type');
        let val = $el.value;

console.log(type);
        switch (type) {
            case 'number':
                addNumber(val);
                break;
            case 'operator':
                addOperator(val);
                break;
            case 'period':
                addPeriod();
                break;
            case 'delete':
                addDelete();
                break;
        }

        render();
    });

    function addNumber(val) {
        if(isFirst){ 
            if(isInt) {
            firstNumber = (firstNumber*10) + Number(val);
            }

            else { //to add .XXX
                dble = eval(val / divisor);
                divisor += '0';
                firstNumber = firstNumber + dble;
            }           
        }

        else {
            if(isInt) {
            secondNumber = (secondNumber*10) + Number(val);
            }

            else {
                dble = eval(val / divisor);
                divisor += '0';
                secondNumber = secondNumber + dble;
            }
        }
    }

    function addPeriod() {
        isInt = false; //not Int 
    }

    function addOperator(operatorValue) {
        if (isFirst && operatorValue !== '=') {
        isFirst = false;
        $operator = operatorValue;
        isInt = true; 
        divisor = '10';  
        }

        else if (isFirst && operatorValue !== '=' && $operator !== '') { 
            //no action in this case, already have a operator
        }

        else if (isFirst && operatorValue === '=') { 
                //no action
        }

       

        else if (!isFirst && operatorValue === '=') { //normal
            calculation();
            isFirst = true;
            isInt = true;
            divisor = '10';
        }

        else {  //if isFirst = false and operator is not '=' 
            calculation();
            $operator = operatorValue;
            isInt = true;
            divisor = '10';
        }
    }

    function addDelete() {
        firstNumber = 0;
        secondNumber = 0;
        isFirst = true;
        $operator = '';
        isInt = true;
        divisor = '10';           
    };

    function calculation() {
            switch($operator) {
                case '+':
                firstNumber = firstNumber + secondNumber;
                secondNumber = 0;
                $operator = '';
                break;

                case '-':
                firstNumber = firstNumber - secondNumber;
                secondNumber = 0;                
                $operator = '';
                break;
                
                case '*':
                firstNumber = firstNumber * secondNumber;
                secondNumber = 0;               
                $operator = '';
                break;
                
                case '/':
                firstNumber = firstNumber / secondNumber;
                secondNumber = 0;                
                $operator = '';
                break;
            }
    }

    function render() {
        if(isFirst){
           $result.textContent = firstNumber;
        }

        else if(!secondNumber) {
            $result.textContent = firstNumber; //second number is 0 and the user see firstMumber
        }

        else {
            $result.textContent = secondNumber;
        }      
    }
})();
