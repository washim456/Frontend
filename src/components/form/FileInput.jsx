export const FileInput = ({label="Select file", name,changeFn}) => {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input accept="application/pdf" name={name} onChange={changeFn} type="file" className="file-input file-input-sm file-input-primary file-input-bordered w-full" />
        </label>
    )
}