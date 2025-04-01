import { useEffect, useState } from "react"

function NewExchange({rate}) {
    const [amount, setAmount] = useState('');
    const [converted, setConverted] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [fixedRate, setFixedRate] = useState('');
    const [history, setHistory] = useState([]);

    function onChangeAmount(e) {
        const newValue = e.target.value;
        setAmount(newValue);

        if (newValue) {
            addHistory(newValue, calculateConverte(fixedRate, rate, newValue, currency), currency, rate, fixedRate);
        }
    }

    function onChangeCurrency(e) {
        const newValue = e.target.value;
        setCurrency(newValue);
        setAmount(converted);

        addHistory(converted, calculateConverte(fixedRate, rate, converted, newValue), newValue, rate, fixedRate);
    }

    function onChangeFixedRate(e) {
        const newValue = e.target.value;
        setFixedRate(newValue);

        if (newValue) {
            addHistory(amount, calculateConverte(newValue, rate, amount, currency), currency, rate, newValue);
        }
    }

    function calculateConverte(fixedRateParam, rateParam, amountParam, currencyParam) {
        let rateToApply;
        
        if (fixedRateParam) {
            const variation = Math.abs(fixedRateParam - rateParam);
            const threshold = 0.02 * rateParam;
            if (variation > threshold) {
                rateToApply = rateParam;
            } else {
                rateToApply = fixedRateParam;
            }
        } else {
            rateToApply = rateParam;
        }
        
        switch (currencyParam) {
            case 'EUR':
                return amountParam ? (amountParam * rateToApply).toFixed(2) : '';
            case 'USD':
                return amountParam ? (amountParam / rateToApply).toFixed(2) : '';
            default:
                // do nothing
                return;
        }
    }

    function addHistory(amountParam, convertedParam, currencyParam, rateParam, fixedRateParam) {
        const convertedCurrency = ['EUR', 'USD'].filter(v => v !== currencyParam).at(0);
        const newEntry = {
          rate: rateParam,
          fixedRate: fixedRateParam,
          amount: amountParam + ' ' + currencyParam,
          converted: convertedParam + ' ' + convertedCurrency
        }
        setHistory(prev => [newEntry, ...prev].slice(0, 5));
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
                    <option value="EUR">Euro</option>
                    <option value="USD">Dollar</option>
                </select>
            </label>
            <br/>
            <label>
                Fixed Rate
                <input type="number" value={fixedRate} onChange={onChangeFixedRate} />
            </label>
            <p>Converted : {converted}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th>Real Rate</th>
                        <th>Fixed Rate</th>
                        <th>Amount</th>
                        <th>Converted</th>
                    </tr>
                </thead>
                <tbody>
                {history.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.rate}</td>
                        <td>{entry.fixedRate}</td>
                        <td>{entry.amount}</td>
                        <td>{entry.converted}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default NewExchange