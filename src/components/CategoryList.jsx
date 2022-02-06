import { useState } from "react";
import EmptyState from "./EmptyState";

import { CancelRounded } from "@material-ui/icons";
import DeleteModal from "./DeleteModal";
import loader from "../assets/loader.gif";
export default function CategoryList({ data, loading }) {
  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  if (loading || !data) {
    return (
      <div className="mx-auto mt-4 flex items-center justify-center bg-white h-screen w-full">
        <img src={loader} alt="" />
      </div>
    );
  }
  if (data?.length <= 0) {
    return <EmptyState state={"Category"} to={false} />;
  } else
    return (
      <div className="">
        <div className=" mx-auto py-4 ">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product, i) => (
              <div
                key={product.id}
                className="group relative bg-white pb-6 rounded-2xl"
              >
                <div className="w-full min-h-80  aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none">
                  <img
                    src={product.image}
                    alt={i}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between px-4 text-blue-600">
                  <p className="text-base text-center font-medium">
                    {product.name}
                  </p>
                  <p
                    onClick={() => {
                      setID(product.id);
                      setOpen(true);
                    }}
                    className="hover:text-red-700 cursor-pointer"
                  >
                    <CancelRounded />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DeleteModal id={id} open={open} setOpen={setOpen} />
      </div>
    );
}
