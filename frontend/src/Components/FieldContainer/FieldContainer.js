import Input from "../Inputs/Input";

function FieldContainer({maxWidth, value, onChange, label, placeholder, type}) {
    return (
        <div
            className={maxWidth ? `max-w-[8.75rem] pr-[1.25rem] border-r-[1px] border-r-blue-100` : "grow"}>
            <Input type={type || "text"} value={value} onChange={onChange}
                   label={label} placeholder={placeholder}/>
        </div>
    );
}

export default FieldContainer;