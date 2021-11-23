$(function () {


    let expenseList = [];
    let sumAmount1 = 0
    let budgetSubmitBtn = $('#budget-submit')
    let firstTimeBuildTable = true;

    budgetSubmitBtn.on('click', function (e) {
        e.preventDefault()

        let budgetInput = parseInt($('#budget-input').val())
        let budgetFeedback = $('.budget-feedback')

        if ($('#budget-input').val() == '' || budgetInput <= 0) {
            budgetFeedback.text('Value cannot be empty or negative.')
            budgetFeedback.show()

            $('#budget-input').on('click', function () {
                budgetFeedback.hide()
                $('.form-group').find(':input').val('')
            })

        } else if (budgetInput > 0) {
            let budgetAmount = $('#budget-amount')
            let balanceAmount = $('#balance-amount')
            budgetAmount.text(budgetInput)
            balanceAmount.text(budgetInput)
            $('.form-group').find(':input').val('')
        }


    })

    let expenseSubmitBtn = $('#expense-submit')
    let sumAmount2 = 0

    expenseSubmitBtn.on('click', function (e) {
        e.preventDefault()

        let expense = $('#expense')
        let expenseInput = $('#expense-input').val()
        let amountInput = parseInt($('#amount-input').val())
        let balanceAmount = $('#balance-amount')
        expenceFeedback = $('.expense-feedback')

        if (expenseInput == '' || $('#amount-input').val() == '') {
            expenceFeedback.text('Values cannot be empty.')
            expenceFeedback.show()

            $('#expense-input').on('click', function () {
                expenceFeedback.hide()
                $('#expense-input').val('')
            })

            $('#amount-input').on('click', function () {
                expenceFeedback.hide()
               $('#amount-input').val('')
            })

        } else {
            expenseList.push({ expenseName: expenseInput, expenseValue: amountInput })
            expense.text(expenseList.map(x => x.expenseValue).reduce((a, b) => a + b, 0))
            /* balanceAmount -= expence */
            $('.form-group').find(':input').val('')
            balanceAmount.text(parseInt(balanceAmount.text()) - amountInput);

            let table = $('<table>', {
                class: "col-md-10 offset-md-1",
                /*  border: "1px solid black" */
            })

            if (firstTimeBuildTable) {

                let thead = $('<thead>', {
                })
                let tr1 = $('<tr>', {
                    class: "row my-3"
                })
                let th1 = $('<th >', {
                    class: "col-md-4 text-center font-weight-bolder text-capitalize h4"
                })
                th1.text('Expence')
                let th2 = $('<th >', {
                    class: "col-md-4 text-center font-weight-bolder text-capitalize h4"
                })
                th2.text('Expence value')
                let th3 = $('<th >', {
                    class: "col-md-4 text-center font-weight-bolder text-capitalize h4"
                })

                tr1.append(th1)
                tr1.append(th2)
                tr1.append(th3)
                thead.append(tr1)
                table.append(thead)
                firstTimeBuildTable = false;
            }



            let tbody = $('<tbody>', {
            })

            let tr2 = $('<tr>', {
                class: "row"
            })
            let td1 = $('<td>', {
                class: "col-md-4 text-center font-weight-bolder text-capitalize h4 text-danger",
            })
            td1.text("- " + expenseInput)
            let td2 = $('<td>', {
                class: "col-md-4 text-center font-weight-bolder text-capitalize h4 text-danger",
            })
            td2.text(amountInput)
            let td3 = $('<td>', {
                class: "col-md-4 text-center font-weight-bolder text-capitalize h4 ",
            })
            td3.html(`<i class="far fa-edit edit-button" data-index=${expenseList.length - 1}></i>
            <i class="far fa-trash-alt delete-button" data-index=${expenseList.length - 1}></i>`)

            tr2.append(td1)
            tr2.append(td2)
            tr2.append(td3)
            tbody.append(tr2)
            table.append(tbody)

            $('#dynamicTable').append(table)

        }
    })

    $(document).on('click', '.edit-button', function () {
        const index = $(this).data('index');
        const expense = expenseList[index];
        $('#expense-input').val(expense.expenseName)
        $('#amount-input').val(expense.expenseValue)
        $(this).parent().parent().remove()
        recalculateValuesForExpenseAndBalance(index)
    })

    $(document).on('click', '.delete-button', function () {
        const index = $(this).data('index');
        $(this).parent().parent().remove()
        recalculateValuesForExpenseAndBalance(index)
    })

    function recalculateValuesForExpenseAndBalance(index) {
        const expenseSum = expenseList.map(x => x.expenseValue).reduce((a, b) => a + b, 0);
        expenseList = expenseList.filter((x, id) => id != index)

        console.log($('#expense').text())
        let balanceAmount = $('#balance-amount').text(parseInt($('#balance-amount').text()) + expenseSum);
        let expenseAmount = $('#expense').text(parseInt($('#expense').text()) - expenseSum);

    }

})

















