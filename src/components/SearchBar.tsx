const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex justify-center my-6">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search broker, country, regulator..."
      className="w-130 max-w-3xl border-2 border-blue-500 rounded-full px-6 py-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    />
  </div>
);

export default SearchBar;
