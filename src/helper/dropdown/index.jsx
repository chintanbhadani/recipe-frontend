const SelectDropDown = ({ options, onChange, value }) => {
  return (
    <select value="option1" onChange={(e) => console.log(e.target.value)}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  );
};

export default SelectDropDown;
