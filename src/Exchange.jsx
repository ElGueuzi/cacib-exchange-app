import { useState } from "react"

function Exchange({rate}) {
    const [euro, setEuro] = useState('');
    const [dollar, setDollar] = useState('');

    function onChange(e) {
        const newValue = e.target.value;
        if (newValue !== '') {
            setEuro(newValue);
            setDollar((newValue * rate).toFixed(2));
        } else {
            setEuro('');
            setDollar('');
        }
    }

    return (
        <div>
            <label>
                Euro
                <input type="number" value={euro} onChange={onChange} />
            </label>
            <p>Dollar : {dollar}</p>
        </div>
    )
}

export default Exchange