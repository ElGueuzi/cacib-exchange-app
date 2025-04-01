import { useEffect, useState } from "react"

function Exchange({rate}) {
    const [euro, setEuro] = useState('');
    const [dollar, setDollar] = useState('');

    function onChange(e) {
        const newValue = e.target.value;
        setEuro(newValue);
    }

    useEffect(() => {
        if (euro !== '') {
            setDollar((euro * rate).toFixed(2));
        } else {
            setDollar('');
        }
    }, [rate, euro])

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