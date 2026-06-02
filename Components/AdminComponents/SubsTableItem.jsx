"use client"

const SubsTableItem = ({email, mongoId, deleteEmail, date}) => {
    const emailDate = new Date(date);

    return (
        <tr className="bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border-b border-black dark:border-zinc-800 transition-colors">
            <td className="px-6 py-4 font-extrabold text-black dark:text-zinc-100 text-xs sm:text-sm whitespace-nowrap">
                {email? email : "No Email"}
            </td>
            <td className="hidden sm:table-cell px-6 py-4 font-bold text-slate-700 dark:text-zinc-400 text-xs sm:text-sm whitespace-nowrap">
                {emailDate.toDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <button 
                    onClick={() => deleteEmail(mongoId)}
                    className="cursor-pointer bg-[#ff1744] text-white border-2 border-black dark:border-white px-3 py-1.5 font-black text-xs shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff] hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-none dark:hover:shadow-none active:translate-x-0 active:translate-y-0 transition-all duration-100 rounded-none"
                >
                    DELETE
                </button>
            </td>
        </tr>
    );
}

export default SubsTableItem;