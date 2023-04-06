export default function CarForm(){
    const handleSubmit = async(event)=>{
        event.preventDefault();
        //think of the FormData class as an envelope to send a letter (key:value pairs)
        const form = new FormData(event.target)
        const formData = Object.fromEntries(form.entries())
        console.log(formData)

        const res = await fetch('/api/cars', {
            body:JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()
        console.log(result)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input name="make" type="text" />
            <input name="model" type="text" />
            <input name="image" type="text" />
            <textarea name="description" type="text" />

            <button type="submit"> Create Car </button>
        </form>
    )
}