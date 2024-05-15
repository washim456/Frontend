export const InputText = ({ label, changeFn, placeholder, type = "text", classNames, ...otherProps }) => {
    const disabled = { otherProps }
    return (
        <>
            <div className="w-full">
                {label ? (
                    <div className="label">
                        <span className="label-text">{label}</span>
                    </div>

                ) : (
                    null
                )}

                <input className={`input input-bordered w-full ${disabled ? "disabled" : ""} ${classNames}`} type={type} placeholder={placeholder} onChange={changeFn} {...otherProps} />
            </div>
        </>
    )
}