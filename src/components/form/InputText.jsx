export const InputText = ({changeFn, placeholder, type = "text", ...otherProps}) => {
    const disabled = { otherProps }
    return (
        <>
           <input className={`input input-bordered w-full max-w-xs ${disabled ? "disabled":""}`} type={type} placeholder={placeholder} onChange={changeFn} {...otherProps}/>
        </>
    )
}