import { useEffect, useState } from "react"

function NewExchange({rate}) {
    const [amount, setAmount] = useState('');
    const [converted, setConverted] = useState('');
    const [currency, setCurrency] = useState('EUR');

    function onChangeAmount(e) {
        const newValue = e.target.value;
        setAmount(newValue);
    }

    function onChangeCurrency(e) {
        const newValue = e.target.value;
        setCurrency(newValue);
        setAmount(converted);
    }

    useEffect(() => {
        switch (currency) {
            case 'EUR':
                setConverted(amount !== '' ? (amount * rate).toFixed(2) : '');
                break;
            case 'USD':
                setConverted(amount !== '' ? (amount / rate).toFixed(2) : '');
                break;
            default:
                // do nothing
        }
    }, [rate, amount, currency])

    return (
        <div>
            <label>
                Amount
                <input type="number" value={amount} onChange={onChangeAmount} />
                <select value={currency} onChange={onChangeCurrency} >
                    <option>EUR</option>
                    <option>USD</option>
                </select>
            </label>
            <p>Converted : {converted}</p>
        </div>
    )
}

export default NewExchange