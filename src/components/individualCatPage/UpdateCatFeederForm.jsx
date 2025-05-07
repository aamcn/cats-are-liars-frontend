import { useEffect } from "react";

function UpdateCatFeederForm({ catData }) {

    useEffect(() => {
        console.log(catData)
    }, [])

    return (
        <div>
            <form>
                <fieldset>
                    <label htmlFor="catId" >Cat</label>
                    <input type="text" value={catData.name} readOnly required></input>
                </fieldset>
                <fieldset>
                    <label htmlFor="feederUsername">Choose the new feeder.</label>
                   <select name="feederUsername">
                        <option>
                            option 1
                        </option>
                   </select>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateCatFeederForm;