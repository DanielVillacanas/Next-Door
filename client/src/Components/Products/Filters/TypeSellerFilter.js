import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";

const sortOptions = [
  { value: "1", label: "Más caro", checked: false },
  { value: "0", label: "Más barato", checked: false },
];
const filters = [
  {
    id: "color",
    name: "Categoría de Productos",
    options: [
      { value: "Carnes", label: "Carnes", checked: false },
      { value: "Pescados", label: "Pescados", checked: false },
      { value: "Frutas", label: "Frutas", checked: false },
      { value: "Verduras", label: "Verduras", checked: false },
      { value: "Other", label: "Otros", checked: false },
    ],
  },
];

function TypeSellerFilter(props) {
  const handleFilterChange = (e) => {
    let filter = e.currentTarget.value;
    props.getFilter(filter);
  };

  const handleShortFilterChange = (e) => {
    let shortFilterID = e.currentTarget.id;
    console.log(shortFilterID);
    props.getShort(shortFilterID);
  };

  return (
    <div>
      <div className="bg-white">
        <div>
          <main className="max-w-7xl mx-24 px- sm:px-6 lg:px-8">
            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <div>
                <form className="block">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 pb-6 pt-4"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flex justify-between">
                            <div>
                              <Disclosure.Button className=" bg-white w-full flex justify-start text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className=" flex items-center">
                                  {open ? (
                                    <MinusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </div>
                            <div>
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Ordenar por precio
                                    <ChevronDownIcon
                                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                </div>
                                <Menu.Items className="origin-top-right absolute right-2 sm:left-20 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    {sortOptions.map((option, i) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center px-4 py-2"
                                      >
                                        <input
                                          onChange={handleShortFilterChange}
                                          id={option.value}
                                          name="radio-filter"
                                          defaultChecked={false}
                                          type="radio"
                                          className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 "
                                        />
                                        <label
                                          htmlFor={option.value}
                                          className="ml-3 text-sm text-gray-600"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Menu>
                            </div>
                          </h3>

                          <Disclosure.Panel className="pt-6">
                            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 space-y-2">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={option.value}
                                    onChange={handleFilterChange}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 "
                                  />
                                  <label
                                    htmlFor={option.value}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TypeSellerFilter;
