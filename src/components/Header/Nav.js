import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {Link} from 'react-router-dom';

export default function Nav(props) {
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category

  const createNavItem = (category) => {
    const isCategorySelected = selectedCategory === category.categoryId;

    const handleCategoryClick = () => {
      setSelectedCategory(isCategorySelected ? null : category.categoryId);
    };

    return (
      <Popover key={category.categoryId} className="relative">
        <Popover.Button
          className={`flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 ${
            isCategorySelected ? 'text-indigo-600' : ''
          }`}
          onClick={handleCategoryClick} // Toggle selected category on click
        >
          {category.categoryName}
          <ChevronDownIcon
            className={`h-5 w-5 flex-none ${isCategorySelected ? 'text-indigo-600' : 'text-gray-400'}`}
            aria-hidden="true"
          />
        </Popover.Button>

        <Transition
          as={Fragment}
          show={isCategorySelected}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className={`fixed top-[11rem] left-0 right-0 z-10 bg-white w-full shadow-none md:shadow-lg md:ring-2 md:ring-black md:ring-opacity-20 ${
              isCategorySelected ? 'block' : 'hidden'
            }`}
            style={{
              boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.2), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex max-w-screen-xl mx-auto">
              <div className="flex-1 p-4">
                {category.subCategories.map((item) => (
                  <div
                    key={item.subCategoryId}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <Link
                        to={`shop${item.subCategoryNavLink}`}
                        onClick={() => {
                          props.setSearchRule(`categoryId=${item.subCategoryId}`);
                          setSelectedCategory(null)
                        }}
                        className="block font-semibold text-gray-900"
                      >
                        {item.subCategoryName}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.subCategoryDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex-1 bg-cover bg-right"
                style={{
                  backgroundImage: 'url(https://picsum.photos/200/300)', // Replace with your desired background image link
                }}
              ></div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  };

  useEffect(() => {
    // Close the modal on scroll
    const handleScroll = () => {
      setSelectedCategory(null);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="mx-auto hidden lg:flex max-w-7xl items-center justify-center py-6" aria-label="Global">
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      {props.categories.map((category) => createNavItem(category))}
    </Popover.Group>
  </nav>
);
}
