import React, { useState } from "react";

export default function Modal({ data }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {data ? (
        <div
          onClick={() => setShowModal(true)}
          className="bg-gray-100 text-black cursor-ponter active:bg-black-600 font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-col"
        >
          <span className="m1 cursor-pointer">Device</span>
          <button className="cursor-pointer" type="button">
            {data.id}
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid text-center border-slate-200 rounded-t">
                  <h3 className="mobile:text-l text-s font-semibold">ID: {data?.id}</h3>
                </div>
                <div className="relative p-6 mobile:text-m text-s text-slate-500 leading-relaxed  grid grid-cols-4 gap-4">
                  <label>Step:</label>
                  <span className="text-center">{data?.step}</span>

                  <label>Substep:</label>
                  <span className="text-center">{data?.step}</span>

                  <label>Model:</label>
                  <span className="text-center">{data?.step}</span>

                  <label>HeatPump:</label>
                  <span className="text-center">{data?.step}</span>

                  <label>Tank Number:</label>
                  <span className="text-center">{data?.step}</span>

                  <label>Power:</label>
                  <span className="text-center">{data?.power}</span>

                  <label>Versio:</label>
                  <span className="text-center">{data?.version}</span>

                  <label>Bypass:</label>
                  <span className="text-center">{data?.bypass}</span>

                  <label>Status:</label>
                  <span className="text-center">{data?.status}</span>

                  <label>Created At:</label>
                  <span className="text-center">{data?.created_at}</span>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
