import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import instance from "../../axios";
import { useState, useEffect } from "react";
import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";
import { SearchIcon } from "../Icons/Icons";
import { useStateValue } from "../../MyContexts/StateProvider";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const TanStackTable = ({ data }) => {
  const [copyState, setCopyState] = useState(false);
  let [copyItem, setCopyItem] = useState({});
  const handleItemCopy = (url, idx) => {
    navigator.clipboard.writeText(url).then(
      function () {
        setCopyItem({ ...copyItem, [idx]: true });
        setTimeout(() => {
          setCopyItem({ ...copyItem, [idx]: false });
        }, 3000);
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  const navigate = useNavigate();

  const columnHelper = createColumnHelper();
  const [{ premium }, dispatch] = useStateValue();
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const handleRedirect = (link) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank");
    } else {
      link = "http://" + link;
      window.open(link, "_blank");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (urlValue) => {
    setUrl(urlValue);
    setShowModal(true);
  };

  let columns=[];

  if(!(!premium || premium==='false')){
    columns = [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.No",
      }),
      columnHelper.accessor("longURL", {
        cell: (info) => (
          <>
            <div className="w-40 truncate">
              <a href={info.getValue()}>{info.getValue()}</a>
            </div>
          </>
        ),
        header: "Original Link",
      }),
       columnHelper.accessor("shortURL", {
        cell: (info) => (
          <>
            <img
              src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
              alt="..."
              className="w-10 h-10 object-cover justify-self-center hover:cursor-pointer"
              onClick={() => handleOpenModal(info.getValue())}
            />
            <Modal show={showModal} onClose={handleCloseModal} value={url} />
          </>
        ),
        header: "QR Code",
      }),
      columnHelper.accessor("shortURL", {
        cell: (info) => (
          <>
            <button
              onClick={() => {
                handleRedirect(info.getValue());
              }}
            >
              {info.getValue()}
            </button>
          </>
        ),
        header: "Short Link",
      }),
      columnHelper.accessor("shortURL", {
        cell: (info) => (
          <button
            className={`relative text-gray-500 ${
              copyItem[info.row.id] ? "text-indigo-600 pointer-events-none" : ""
            }`}
            onClick={handleItemCopy.bind(this, info.getValue(), info.row.index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copyItem[info.row.id] ? (
              <div className="absolute -top-12 -left-3 px-2 py-1.5 rounded-xl bg-indigo-600 font-semibold text-white text-[10px] after:absolute after:inset-x-0 after:mx-auto after:top-[22px] after:w-2 after:h-2 after:bg-indigo-600 after:rotate-45">
                Copied
              </div>
            ) : (
              ""
            )}
          </button>
        ),
        header: "Copy",
      }),
      columnHelper.accessor("clicks", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Clicks",
      }),
      // columnHelper.accessor("isActive", {
      //   cell: (info) => {
      //     const isActive = info.getValue();
      //     const rowId = info.row.id;
      //     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
      //     const toggleDropdown = () => {
      //       setIsDropdownOpen(!isDropdownOpen);
      //     };
  
      //     const handleStatusChange = (status) => {
      //       // Handle status change logic here
      //       console.log(`Changing status of ${rowId} to ${status}`);
      //       setIsDropdownOpen(false); // Close the dropdown after changing the status
      //     };
  
      //     const handleDelete = () => {
      //       // Handle delete logic here
      //       console.log(`Deleting ${rowId}`);
      //       setIsDropdownOpen(false); // Close the dropdown after deleting
      //     };
  
      //     return (
      //       <div className="relative">
      //         <button
      //           className={isActive ? "text-green-600" : "text-red-600"}
      //           id={`dropdown-${rowId}`}
      //           onClick={toggleDropdown}
      //         >
      //           {isActive ? "Active" : "Inactive"}
      //         </button>
      //         {isDropdownOpen && (
      //           <div
      //             id={`dropdown-menu-${rowId}`}
      //             className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
      //           >
      //             <ul className="py-1 text-sm text-gray-700">
      //               <li>
      //                 <button
      //                   onClick={() => handleStatusChange(true)}
      //                   className="block py-2 px-4 hover:bg-gray-100 w-full"
      //                 >
      //                   Active
      //                 </button>
      //               </li>
      //               <li>
      //                 <button
      //                   onClick={() => handleStatusChange(false)}
      //                   className="block py-2 px-4 hover:bg-gray-100 w-full"
      //                 >
      //                   Not Active
      //                 </button>
      //               </li>
      //               <li>
      //                 <button
      //                   onClick={handleDelete}
      //                   className="block py-2 px-4 hover:bg-gray-100 w-full"
      //                 >
      //                   Delete
      //                 </button>
      //               </li>
      //             </ul>
      //           </div>
      //         )}
      //       </div>
      //     );
      //   },
      //   header: "Status",
      // }),
    ];
  }
  else{
    columns = [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.No",
      }),
      columnHelper.accessor("longURL", {
        cell: (info) => (
          <>
            <div className="w-40 truncate">
              <a href={info.getValue()}>{info.getValue()}</a>
            </div>
          </>
        ),
        header: "Original Link",
      }),
      columnHelper.accessor("shortURL", {
        cell: (info) => (
          <>
            <button
              onClick={() => {
                handleRedirect(info.getValue());
              }}
            >
              {info.getValue()}
            </button>
            {isDropdownOpen && (
              <div
                id={`dropdown-menu-${rowId}`}
                className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
              >
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={() => handleStatusChange(true)}
                      className="block py-2 px-4 hover:bg-green-300 w-full"
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleStatusChange(false)}
                      className="block py-2 px-4 hover:bg-yellow-500 w-full"
                    >
                      Not Active
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDelete}
                      className="block py-2 px-4 hover:bg-red-500 w-full"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
                </div>
            )}
          </>
        ),
        header: "Short Link",
      }),
      columnHelper.accessor("shortURL", {
        cell: (info) => (
          <button
            className={`relative text-gray-500 ${
              copyItem[info.row.id] ? "text-indigo-600 pointer-events-none" : ""
            }`}
            onClick={handleItemCopy.bind(this, info.getValue(), info.row.index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copyItem[info.row.id] ? (
              <div className="absolute -top-12 -left-3 px-2 py-1.5 rounded-xl bg-indigo-600 font-semibold text-white text-[10px] after:absolute after:inset-x-0 after:mx-auto after:top-[22px] after:w-2 after:h-2 after:bg-indigo-600 after:rotate-45">
                Copied
              </div>
            ) : (
              ""
            )}
          </button>
        ),
        header: "Copy",
      }),
      columnHelper.accessor("clicks", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Clicks",
      }),
      columnHelper.accessor("isActive", {
        cell: (info) => {
          const isActive = info.getValue();
          const rowId = info.row.id;
          const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
          const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);
          };
  
          const handleStatusChange = (status) => {
            // Handle status change logic here
            console.log(`Changing status of ${rowId} to ${status}`);
            setIsDropdownOpen(false); // Close the dropdown after changing the status
          };
  
          const handleDelete = () => {
            // Handle delete logic here
            console.log(`Deleting ${rowId}`);
            setIsDropdownOpen(false); // Close the dropdown after deleting
          };
  
          return (
            <div className="relative">
              <button
                className={isActive ? "text-green-600" : "text-red-600"}
                id={`dropdown-${rowId}`}
                onClick={toggleDropdown}
              >
                {isActive ? "Active" : "Inactive"}
              </button>
              {isDropdownOpen && (
                <div
                  id={`dropdown-menu-${rowId}`}
                  className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                >
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <button
                        onClick={() => handleStatusChange(true)}
                        className="block py-2 px-4 hover:bg-gray-100 w-full"
                      >
                        Active
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleStatusChange(false)}
                        className="block py-2 px-4 hover:bg-gray-100 w-full"
                      >
                        Not Active
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDelete}
                        className="block py-2 px-4 hover:bg-gray-100 w-full"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        },
        header: "Status",
      }),
    ];
  }
  // const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
        <DownloadBtn data={data} fileName={"peoples"} />
      </div>

      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-orange-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                  ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                  `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Record Found!</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-gray-400 text-elite-black"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="text-elite-black"
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
