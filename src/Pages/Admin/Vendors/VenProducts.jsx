import React, { useCallback, useEffect, useRef, useState } from "react";
import CommissionModal from "./CommissionModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { activeProduct, getVendorProduct } from "../../../Api/AdminApi";
import { loadSpinner } from "../../../Redux/Features/NavbarSlice";

const VenProducts = ({ id }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [pages, setPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loader = useRef(null);
  const [totalpages, setTotalPage] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchKey(value);
      setProducts([]);
      setPages(1);
      getProducts(id, value, 1, true);
    }, 300),
    []
  );
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPages((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader]);
  useEffect(() => {
    getProducts(id, searchKey, pages);
  }, [id, pages]);
  console.log("pages", pages);

  const getProducts = async (id, searchKey, pages, isNewSearch = false) => {
    try {
      // setProducts([]);
      console.log("searchKey", isNewSearch);
      dispatch(loadSpinner());
      const response = await getVendorProduct(id, searchKey, pages);
      setProducts((prevProducts) =>
        isNewSearch
          ? response?.data?.products
          : [...prevProducts, ...response?.data?.products]
      );
      console.log("padefe", response?.data);
      setTotalPages(response?.data?.totalPages);
      dispatch(loadSpinner());
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
      dispatch(loadSpinner());
    }
  };
  const handleActiveProduct = async (productId) => {
    const product = products.find((v) => v._id === productId);
    const action = product.activeStatus ? "In-activated" : "Activated";

    setProductId(productId);

    activeProduct(productId)
      .then((data) => {
        console.log("data in action On product: ", data);
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod._id === productId
              ? { ...prod, activeStatus: !prod.activeStatus }
              : prod
          )
        );
        Swal.fire({
          background: "#000", // Set background to black
          color: "#ffdd11", // Set text color to #ffdd11
          title: `${action.charAt(0).toUpperCase() + action.slice(1)}`,
          text: `Product has been ${action}.`,
          icon: "success",
          confirmButtonColor: "#ffdd11",
        });
      })
      .catch((error) => {
        console.error("Error updating product status:", error);
        Swal.fire("Failed!", `Failed to ${action} the product.`, "error");
      });

    setProductId("");
  };

  const handleProductClick = (productId) => {
    setProductId(productId);
    setIsModalOpen(true);
  };

  const handleModalConfirm = async (option) => {
    if (option === "single") {
      // API call to change commission for a single product
      // await changeCommission(productId, false);
    } else if (option === "all") {
      // API call to change commission for all products of this admin
      // await changeCommission(id, true);
    }
    // Refresh the products list or handle state updates as necessary
  };

  return (
    <>
      <div className="flex justify-end">
        <input
          type="text"
          className="w-1/4 h-10 px-3 bg-subContainerColor text-textColor rounded-md focus:outline-none focus:ring-2 focus:ring-navblue"
          placeholder="Search Product.."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl shadow-md">
        <div className="table-responsive">
          <table className="table align-middle table-nowrap mb-0 h-9 w-full text-sm">
            <thead className="bg-subContainerColor text-textColor h-10">
              <tr>
                <th>Product Details</th>
                <th>Category</th>
                <th>Options</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Comm.%</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-textColor">
              {products.length > 0 ? (
                products?.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200"
                    onClick={() => handleProductClick(product?._id)}
                  >
                    <td className="text-center py-3">
                      <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center">
                        <img
                          src={product?.images[0]}
                          className="m-2 w-7 h-7 mr-2 rounded-full"
                          alt="product Profile"
                        />
                        <span className="sm:ml-2 sm:mt-0">
                          {product?.productName}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex flex-wrap justify-center gap-1">
                        <div className="bg-subContainerColor rounded-md px-2 py-1 overflow-hidden whitespace-nowrap text-xs">
                          {product?.category}
                        </div>
                        {/* {product?.category?.map((category, index) => (
                                                <div key={index} className="bg-subContainerColor rounded-md px-2 py-1 overflow-hidden whitespace-nowrap text-xs">
                                                    {category}
                                                </div>
                                            ))} */}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex flex-wrap justify-center gap-1">
                        {product?.details.map((option, index) => (
                          <div
                            key={index}
                            className="bg-subContainerColor rounded-full px-2 py-1 overflow-hidden whitespace-nowrap text-xs"
                          >
                            {option?.size}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      {product?.price.toFixed(1)}
                    </td>
                    <td className="text-center py-3">
                      {product?.totalQuantity}
                    </td>
                    <td className="text-center py-3">{product?.commission}%</td>
                    <td className="text-center py-3">
                      <div
                        className={`text-xs font-bold py-1 px-2 rounded-full cursor-default ${
                          product?.activeStatus === true
                            ? "bg-green-100 text-green-900"
                            : "bg-red-100 text-red-600 hover:bg-red-500"
                        }`}
                      >
                        {product?.activeStatus === true
                          ? "Active"
                          : "In Active"}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          Swal.fire({
                            background: "#000",
                            color: "#ffdd11",
                            title: "Are you sure?",
                            text: `You want ${
                              product.activeStatus === true
                                ? "In-activate"
                                : "Activate"
                            } this product!`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#FFDD11",
                            cancelButtonColor: "#000",
                            confirmButtonText: "Yes",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleActiveProduct(product?._id);
                            }
                          });
                        }}
                        className={`w-10 h-6 rounded-full focus:outline-none ${
                          product?.activeStatus === true
                            ? "bg-navblue"
                            : "bg-subContainerColor"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full m-1 shadow-md transform duration-300 ${
                            product?.activeStatus === true
                              ? "translate-x-4 bg-white"
                              : "translate-x-0 bg-gray-100"
                          }`}
                        ></div>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-red-600 text-center text-xl py-3"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div ref={loader} className="h-10" />
        </div>
        <CommissionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      </div>
    </>
  );
};

export default VenProducts;
