import { useEffect, useState } from "react"

function NewExchange({rate}) {
    const [amount, setAmount] = useState('');
    const [converted, setConverted] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [fixedRate, setFixedRate] = useState('');

    function onChangeAmount(e) {
        const newValue = e.target.value;
        setAmount(newValue);
    }

    function onChangeCurrency(e) {
        const newValue = e.target.value;
        setCurrency(newValue);
        setAmount(converted);
    }

    function onChangeFixedRate(e) {
        const newValue = e.target.value;
        setFixedRate(newValue);
    }

    useEffect(() => {
        const rateToApply = fixedRate || rate;
        switch (currency) {
            case 'EUR':
                setConverted(amount !== '' ? (amount * rateToApply).toFixed(2) : '');
                break;
            case 'USD':
                setConverted(amount !== '' ? (amount / rateToApply).toFixed(2) : '');
                break;
            default:
                // do nothing
        }
    }, [rate, amount, currency, fixedRate])

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
            <br/>
            <label>
                Fixed Rate
                <input type="number" value={fixedRate} onChange={onChangeFixedRate} />
            </label>
            <p>Converted : {converted}</p>
        </div>
    )
}

export default NewExchange