import LoadingSpinner from "./LoadingSpinner";
import EmptyState from './EmptyState'
import Paginate from "./Paginate";
import {useState,useMemo} from 'react'
let PageSize = 20;
export default function MessageList({ loading, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (data?.getMessages && data?.getMessages?.length > 1) {
      return (
        data?.getMessages &&
        data?.getMessages?.slice(firstPageIndex, lastPageIndex)
      );
    }
    if (data?.getMessages && data?.getMessages?.length <= 1) {
      return data?.getMessages && data?.getMessages;
    }
  }, [currentPage, data?.getMessages]);
    if (loading ) {
        return (
          <div className="mx-auto mt-32">
            <LoadingSpinner height={"32"} width={"32"} color={"green-800"} />
          </div>
        );
      }
      if (data?.getMessages?.length <= 0) {
        return (
        <EmptyState state={'Messages'} to={false}/>
        );
      } else
  return (
    <div className="flex flex-col mt-10 px-16">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData&&currentData.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {person.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <p
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Paginate
        className="flex items-center justify-center"
        currentPage={currentPage}
        totalCount={data.getMessages?.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
          </div>
        </div>
      </div>
    </div>
  );
}
