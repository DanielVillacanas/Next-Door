export default function SearchBar(props) {
  const handleSearchChange = (e) => {
    let query = e.currentTarget.value;
    props.getInfo(query.toLowerCase());
  };

  return (
    <div>
      <div className=" mt-5 mx-12 relative flex items-center border-2 border-green-300 rounded-lg">
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => handleSearchChange(e)}
          className="p-6 h-12 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md"
        />
      </div>
    </div>
  );
}
