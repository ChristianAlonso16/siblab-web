import {useEffect, useState} from "react";

export const FailureMachinesComponent = ({data, onFailure, failure}) =>{

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fillChecks()
    },[])

    const fillChecks = () =>{
        setLoading(true);
        onFailure({});
        const names = data.map(machine => machine.id);
        names.forEach(id =>{
            onFailure(prev => ({...prev, [id]:false}))
        })
        setLoading(false)
    }

    const handleCheckboxChange = (event,machine) => {
        const checkboxName = machine.id;
        const checkboxValue = event.target.checked;

        onFailure(prevState => ({
            ...prevState,
            [checkboxName]: checkboxValue,
        }));

        console.log(failure);
    };

    return( loading ? <></> :
        <>
            <label style={{marginLeft:'10px'}}>Daños:</label>
            <div className='reports mt-2'>
                { data.map(machine => (
                    <div className="checkbox-container">
                        <input type="checkbox" id="my-checkbox" checked={failure[machine.id]} onChange={event => handleCheckboxChange(event,machine)}/>
                        <label key={machine.id} htmlFor="my-checkbox" className="checkbox-label">
                            {machine.name} {machine.brand}
                        </label>
                    </div>
                ))
                }
            </div>
        </>
    )
}