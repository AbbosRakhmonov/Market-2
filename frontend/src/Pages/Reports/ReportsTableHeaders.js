export const ReportsTableHeaders = (header) => {
    let paymenttype =
        (header === 'cash' && 'Naqt') ||
        (header === 'card' && 'Plastik') ||
        (header === 'transfer' && "O'tkazma")

    const headers = {
        sale: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'ID',
            },
            {
                title: 'Mijoz',
            },
            {
                title: 'Sotuv',
            },
            {
                title: 'Naqt',
            },
            {
                title: 'Plastic',
            },
            {
                title: "O'tkazma",
            },
            {
                title: '',
            },
        ],
        income: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'ID',
            },
            {
                title: 'Kelgan narxi',
            },
            {
                title: 'Sotilgan narxi',
            },
            {
                title: 'Chegirma',
            },
            {
                title: 'Foyda',
            },
        ],
        debts: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'ID',
            },
            {
                title: 'Mijoz',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Qarz',
            },
            {
                title: '',
            },
        ],
        expenses: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'Summa',
            },
            {
                title: 'Izoh',
            },
            {
                title: 'Turi',
            },
        ],
        discounts: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'ID',
            },
            {
                title: 'Mijoz',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Chegirma',
            },
            {
                title: 'Foiz',
            },
        ],
        backproducts: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'ID',
            },
            {
                title: 'Mijoz',
            },
            {
                title: 'Soni',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Qaytarilgan',
            },
        ],
        payments: [
            {
                title: '№',
            },
            {
                title: 'Sana',
            },
            {
                title: 'ID',
            },
            {
                title: 'Mijoz',
            },
            {
                title: 'Sotuv',
            },
            {
                title: paymenttype,
            },
        ],
    }

    return header === 'cash' || header === 'card' || header === 'transfer'
        ? headers.payments
        : headers[`${header}`]
}
