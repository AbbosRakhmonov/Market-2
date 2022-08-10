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
                title: 'Mijoz',
            },
            {
                title: 'ID',
            },
            {
                title: 'Qarz',
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
                title: 'Mijoz',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Chegirma',
            },
        ],
        backproducts: [
            {
                title: '№',
            },
            {
                title: 'ID',
            },
            {
                title: 'Mijoz',
            },
            {
                title: 'Mahsulot',
            },
            {
                title: 'Soni',
            },
            {
                title: 'Narxi',
            },
            {
                title: 'Jami',
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
