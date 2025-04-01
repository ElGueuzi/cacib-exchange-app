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
        let rateToApply;
        
        if (fixedRate) {
            const variation = Math.abs(fixedRate - rate);
            const threshold = 0.02 * rate;
            if (variation > threshold) {
                rateToApply = rate;
            } else {
                rateToApply = fixedRate;
            }
        } else {
            rateToApply = rate;
        }
        
        switch (currency) {
            case 'EUR':
                setConverted(amount ? (amount * rateToApply).toFixed(2) : '');
                break;
            case 'USD':
                setConverted(amount ? (amount / rateToApply).toFixed(2) : '');
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
                    <option value="Euro">EUR</option>
                    <option value="Dollar">USD</option>
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