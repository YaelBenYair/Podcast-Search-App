interface IpropsInput {
  placeholder: string;
  type: string;
  name: string;
  foo: Function;
  val: string;
}

const InputLoginSignup = (props: IpropsInput) => {
  const { foo, val, placeholder, type, name } = props;

  return (
    <div className="flex flex-col py2">
      <input
        className="rounded-lg mt-2 p-2 focus:border-gray-700 focus:bg-gray-200 focus:outline-none"
        placeholder={placeholder}
        type={type}
        name={name}
        value={val}
        onChange={(e) => foo(e.target.value)}
      />
    </div>
  );
};

export default InputLoginSignup;
