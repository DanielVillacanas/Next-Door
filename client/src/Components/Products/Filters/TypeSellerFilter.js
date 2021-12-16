import { Disclosure, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
import { sortOptions, filters, range } from "../../../Const/Const";
import React, { useContext } from "react";
import UserContext from "../../../Context/UserContext/UserContext";

function TypeSellerFilter(props) {
  const handleFilterChange = (e) => {
    let filter = e.currentTarget.value;
    props.getFilter(filter);
  };

  let loggedUser = useContext(UserContext);

  const handleShortFilterChange = (e) => {
    let shortFilterID = e.currentTarget.id;
    props.getShort(shortFilterID);
  };

  const handleRangeFilterChange = (e) => {
    let range = e.currentTarget.value;
    props.getRange(range);
  };

  return (
    <div>
      <div className="bg-gray-900">
        <div>
          <div className="max-w-7xl mx-24 sm:px-6 lg:px-8">
            <section aria-labelledby="products-heading" className="pt-6 pb-14">
              <div>
                <form className="block space-y-4">
                  {loggedUser !== null &&
                    range.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-green-500 pb-6 pt-4"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flex justify-between">
                              <div>
                                <Disclosure.Button className=" bg-gray-900 w-full flex justify-start text-sm text-white hover:text-white">
                                  <span className="font-medium text-white">
                                    {section.name}
                                  </span>
                                  <span className=" flex items-center">
                                    {open ? (
                                      <MinusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                        value={0}
                                        onClick={handleRangeFilterChange}
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
                            </h3>

                            <Disclosure.Panel className="pt-6">
                              <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-1 space-y-2">
                                {section.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={option.value}
                                      onChange={handleRangeFilterChange}
                                      name={`${section.id}[]`}
                                      value={option.value}
                                      type="radio"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 border-white rounded text-white focus:ring-white "
                                    />
                                    <label
                                      htmlFor={option.value}
                                      className="ml-3 text-sm text-white"
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
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-green-500 pb-6 pt-4"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flex justify-between">
                            <div>
                              <Disclosure.Button className=" bg-gray-900 w-full flex justify-start text-sm text-white">
                                <span className="font-medium text-white">
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
                                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white">
                                    Ordenar por precio
                                    <ChevronDownIcon
                                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-white group-hover:text-white"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                </div>
                                <Menu.Items className="origin-top-right absolute left-6 sm:left-20 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    {sortOptions.map((option) => (
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
                                          className="h-4 w-4 border-white rounded text-indigo-600 focus:ring-indigo-500 "
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
                              {section.options.map((option) => (
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
                                    className="h-4 w-4 border-white rounded text-white"
                                  />
                                  <label
                                    htmlFor={option.value}
                                    className="ml-3 text-sm text-white"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypeSellerFilter;
