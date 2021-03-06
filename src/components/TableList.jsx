import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "./LoadingSpinner";
import { Store } from "../context/store";
import EmptyState from "./EmptyState";
import Paginate from "./Paginate";
import loader from '../assets/loader.gif'
let PageSize = 20;
export default function TableList({ loading }) {
  const navigate = useNavigate();
  const { dispatch, state,NGFormat,EUFormat } = useContext(Store);
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (state.productList && state.productList.length > 1) {
      return (
        state.productList &&
        state.productList.slice(firstPageIndex, lastPageIndex)
      );
    }
    if (state.productList && state.productList.length <= 1) {
      return state.productList && state.productList;
    }
  }, [currentPage, state?.productList]);

  const handleEdit = (payload) => {
    dispatch({ type: "GET_PRODUCT", payload: payload });
    navigate("/product/edit");
  };
  if (loading || !state.productList) {
    return (
      <div className="mx-auto flex items-center justify-center bg-white h-screen w-full">
      <img src={loader} alt=''/>
      </div>
    );
  }
   else if (state.productList <= 0 && state.search) {
    return (
      <h1 className="flex items-center py-5 justify-center align-middle text-blue-800 text-3xl font-bold h-full">
        No product found
      </h1>
    );
  }
  if (state.productList.length <= 0 && !state.search) {
    return <EmptyState state={"Product"} to={"/addproduct"} />;
  } else
    return (
      <div className="flex flex-col mt-10 px-4">
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      In Stock
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData &&
                    currentData.map((person, personIdx) => (
                      <tr
                        key={personIdx}
                        className={
                          personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {person.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-clip">
                          <p className="w-40 truncate"> {person.desc}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-32">
                          {person.location === "UK"
                            ? EUFormat.format(person.price)
                            :  NGFormat.format(person.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.inStock ? "YES" : "NO"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div
                            onClick={() => handleEdit(person)}
                            className="text-blue-600 cursor-pointer hover:text-blue-900"
                          >
                            Edit
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Paginate
                className="flex items-center justify-center"
                currentPage={currentPage}
                totalCount={state.productList.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
