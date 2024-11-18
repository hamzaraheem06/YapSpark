import React, { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  {
    options = [],
    label = "What's on your mind?",
    isActive = true,
    placeHolder = "Type Here",
    altLabel = null,
    optionLabel = "Select your option",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <label className="form-control w-full max-w-xs" htmlFor={id}>
      <div className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">{altLabel}</span>
      </div>
      <select className="select select-bordered" id={id} {...props} ref={ref}>
        <option disabled defaultChecked>
          {optionLabel}
        </option>

        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
});

export default Select;
