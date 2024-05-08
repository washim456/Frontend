export const Button = ({submitFn, children, variant="primary", disabled , type="wide"}) => {
    return (
        <>
           <button onClick={submitFn} className={`btn btn-${type} btn-outline btn-${variant} btn-${disabled}`}>{children}</button>
        </>
    )
}