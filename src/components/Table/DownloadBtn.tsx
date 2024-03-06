import { DownloadIcon } from "../Icons/Icons";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <button
      className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1 rounded-md hover:bg-violet-600 transition-all duration-300 ease-in-out active:bg-lite-gray duration-150"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <DownloadIcon />
      Download
    </button>
  );
};

export default DownloadBtn;