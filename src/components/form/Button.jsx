export const Button = ({submitFn, children, variant="primary", disabled , type="wide" , classNames, outline}) => {
    return (
        <>
           <button onClick={submitFn} className={`btn btn-${type} btn-${outline} btn-${variant} btn-${disabled} ${classNames}`}>{children}</button>
        </>
    )
}