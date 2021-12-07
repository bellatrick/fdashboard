/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import CustomInput from "../components/CustomInput";
import { FETCH_CATEGORIES } from "../utils/Graphql";
import MediaInput from "../components/MediaInput";
import { cloneDeep } from "@apollo/client/utilities";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
export default function Example({ open, setOpen }) {
  const [image, setImage] = useState(false);
  const [fileImage, setFileImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);

  const [name, setname] = useState("");
  const [loadingImg, setLoading] = useState(false);
  const handleImagePreview = (image) => {
    return URL.createObjectURL(image);
  };
  const [postCategory, { loading }] = useMutation(POST_CATEGORY, {
    variables: { name, image },
    update(proxy, result) {
      setImagePreview(false);
      setname("");
      const data = cloneDeep(
        proxy.readQuery({
          query: FETCH_CATEGORIES,
          variables: { limit: 5, offset: 0 },
        })
      );

      data.getCategory.unshift(result.data.postCategory);

      proxy.writeQuery({
        query: FETCH_CATEGORIES,
        data,
        variables: { limit: 5, offset: 0 },
      });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      if (!image) {
        toast.warn("Image has not been uploaded");
       return
      }
      await postCategory();
      toast.success("Category has been successfully added");
      setOpen(false);
    } catch (err) {
      toast.error('Something went wrong')
      console.log(err);
    }
  };
  const handleDeleteImage = () => {
    setFileImage(false);
    setImage(false);
    setImagePreview(false);
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", fileImage);
    data.append("upload_preset", "bellatrix");
    data.append("cloud_name", "di8tcw4ul");
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di8tcw4ul/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const dataRes = await res.json();
      setLoading(false);
      setImage(dataRes.url);

      toast.success(
        "Image has been uploaded, please proceed to fill in the name of the category"
      );
      return dataRes.url;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fileImage && setImagePreview(handleImagePreview(fileImage));
  }, [fileImage]);
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
                    Add Category
                  </Dialog.Title>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div
                        className="mt-5 sm:px-4 mx-auto py-6  "
                        onClick={handleDeleteImage}
                      >
                        <img
                          alt={"preview"}
                          src={imagePreview}
                          className="mr-6  rounded-lg w-32 h-32"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <MediaInput
                      placeholder="UPLOAD IMAGE"
                      buttonText="Browse"
                      label="Product Image  *"
                      value={fileImage}
                      onChange={(e) => setFileImage(e.target.files[0])}
                      type="file"
                      helperText=""
                    />
                    <button
                      type="button"
                      className="my-5 bg-gray-900 text-white px-6 py-2 w-40 hover:bg-gray-700 rounded-2xl"
                      onClick={uploadImage}
                    >
                      {loadingImg ? (
                        <LoadingSpinner
                          height={"6"}
                          width={"5"}
                          color={"bg-white"}
                        />
                      ) : (
                        " Upload Image"
                      )}
                    </button>
                    <p className="text-sm text-bold tracking-wider pb-10 text-green-600">
                      Click the upload image button after selecting all the
                      images you'd like to upload for this product.
                    </p>
                  </div>
                  <div className="mr-6 w-full">
                    <CustomInput
                      label="PRODUCT NAME"
                      type="type"
                      data_testid={"email"}
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
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
const POST_CATEGORY = gql`
  mutation ($name: String!, $image: String!) {
    postCategory(name: $name, image: $image) {
      id
      image
      name
    }
  }
`;
