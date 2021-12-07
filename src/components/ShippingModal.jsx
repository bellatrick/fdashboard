/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import CustomInput from "../components/CustomInput";
import { FETCH_SHIPPING } from "../utils/Graphql";
import { cloneDeep } from "@apollo/client/utilities";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
export default function ShippingModal({ open, setOpen,id }) {

  const [UK, setUK] = useState("");
  const [Nigeria,setNigeria] = useState('')
 
  const [postShipping, { loading }] = useMutation(POST_SHIPPING, {
    variables: { uKToNigeria:UK,nigeriaToUK:Nigeria, id },
    update(proxy, result) {
    
      setNigeria("");
      setUK('')
      const data = cloneDeep(
        proxy.readQuery({
          query: FETCH_SHIPPING,
          variables: { limit: 5, offset: 0 },
        })
      );

    //   data.getCategory.unshift(result.data.editShipping);

      proxy.writeQuery({
        query: FETCH_SHIPPING,
        data,
        variables: { limit: 5, offset: 0 },
      });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      await postShipping();
      toast.success("Shipping cost has been successfully updated");
      setOpen(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <form
              onSubmit={handleSubmit}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm lg:max-w-xl sm:w-full sm:p-6"
            >
              <div>
                <div className="mt-3  sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-bold text-center leading-6 font-medium text-green-700"
                  >
                    Edit Shipping Costs
                  </Dialog.Title>
               
                  <div className="mr-6 mt-4 w-full">
                    <CustomInput
                      label="UK TO NIGERIA"
                      type="type"
                     placeholder='€100'
                      id="name"
                      name="name"
                      value={UK}
                      onChange={(e) => setUK(e.target.value)}
                      autoComplete="product"
                    />
                  </div>
                  <div className="mr-6 mt-4 w-full">
                    <CustomInput
                      label=" NIGERIA TO UK"
                      type="type"
                      placeholder='N1000'
                      id="name"
                      name="name"
                      value={Nigeria}
                      onChange={(e) => setNigeria(e.target.value)}
                      autoComplete="product"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 px-32">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                >
                  {loading ? (
                    <LoadingSpinner
                      height={"6"}
                      width={"5"}
                      color={"bg-white"}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
                
              </div>

            </form>
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
const POST_SHIPPING = gql`
  mutation ($uKToNigeria: String!, $nigeriaToUK: String!,$id:ID!) {
    editShipping(uKToNigeria: $uKToNigeria, nigeriaToUK: $nigeriaToUK, id:$id) {
      id
      nigeriaToUK
      uKToNigeria
    }
  }
`;
