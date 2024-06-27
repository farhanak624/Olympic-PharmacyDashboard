import React, { useState } from "react";
import { toast } from "react-toastify";

function Countryselector({
  bankName,
  setBankName,
  accountName,
  setAccountName,
  accountNumber,
  setAccountNumber,
  ifsc,
  setIfsc,
  iban,
  setIban,
  bankNameError,
  accountNameError,
  accountNumError,
  ibanError,
  ifscError,
  isModal = false,
  isEditMode = false,
  onSave = () => {},
  onMakePrimary = () => {},
}) {
  const [modalTitle, setModalTitle] = useState("Add your bank account");

  useState(() => {
    if (isEditMode) {
      setModalTitle("Edit bank details");
    } else {
      setModalTitle("Add your bank account");
    }
  }, [isEditMode]);

  const handleMakePrimaryClick = () => {
    onMakePrimary();
  };

  return (
    <div className="bg-containerWhite text-textColor">
      <h1 className="font-bold">{modalTitle}</h1>
      {(bankNameError ||
        accountNameError ||
        accountNumError ||
        ibanError ||
        ifscError) && (
        <span className="text-red-500 text-xs">
          Add Bank Account Details Properly
        </span>
      )}

      <div className="mt-5">
        <p className="text-xs font-bold">Add bank</p>
        <input
          type="text"
          placeholder="Enter Bank name"
          className="outline-none px-2 border w-full border-gray-300 rounded-md p-0.5 py-1 bg-subContainerColor text-textColor"
          value={bankName}
          onChange={(e) => {
            setBankName(e.target.value);
            console.log("edit name:", e.target.value);
          }}
        />
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold">Account Name</p>
        <input
          type="text"
          placeholder="Enter account name"
          className="outline-none border px-2 w-full border-gray-300 rounded-md p-0.5 py-1 bg-subContainerColor text-textColor"
          value={accountName}
          onChange={(e) => {
            const inputValue = e.target.value;
            // Check if the input starts with a special character or number
            if (/^[a-zA-Z\s]*$/.test(inputValue)) {
              setAccountName(inputValue);
            } else {
              toast(
                "Please enter a valid account name. Only letters and spaces are allowed."
              );
            }
            // Update the state if the input is valid
            setAccountName(inputValue);
          }}
        />
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold">Account number</p>
        <input
          type="number"
          placeholder="Enter account number"
          className="outline-none border px-2 w-full border-gray-300 rounded-md p-0.5 py-1 bg-subContainerColor text-textColor"
          value={accountNumber}
          onWheel={(e) => e.target.blur()}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold">IFSC</p>
        <input
          type="text"
          placeholder="Enter IFSC"
          className="outline-none border px-2 border-gray-300 rounded-md p-0.5 py-1 bg-subContainerColor text-textColor"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <p className="text-xs font-bold">IBAN</p>
        <input
          type="text"
          placeholder="Enter IBAN"
          className="outline-none border px-2 border-gray-300 rounded-md p-0.5 py-1 bg-subContainerColor text-textColor"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
        />
      </div>
      {isModal && (
        <div className="flex justify-end mt-5">
          <button
            onClick={onSave}
            className="text-textColor2 px-4 py-2 rounded-md bg-navblue"
          >
            Submit
          </button>
        </div>
      )}
      {isEditMode && (
        <div className="flex justify-between mt-5">
          <button
            onClick={handleMakePrimaryClick}
            className="px-4 py-2 rounded-md mr-2 bg-navblue text-textColor2"
          >
            Make as Primary
          </button>
          <button
            onClick={onSave}
            className="text-white px-4 py-2 rounded-md bg-subColor"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Countryselector;
