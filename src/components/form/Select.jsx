export const Select = ({options, placeholder, changeFn, ...otherProps}) => {
    const disabled = { otherProps }
    return (
        <select className={`select select-bordered w-full ${disabled ? "disabled":""}`} onChange={changeFn} {...otherProps}>
            <option disabled selected>{placeholder}</option>
            {/* <option>Han Solo</option>
            <option>Greedo</option> */}
            {options.map(item => <option value={item.value}>{item.label}</option>)}
        </select>
    )
}