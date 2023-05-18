import React from "react";
const Contact = () => {



  return (
    <div className="flex min-h-screen w-full items-center justify-center m-4">
    <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
        <div className="col-span-1 lg:col-span-9">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-zinc-700">contact person name</h2>
            <p className="mt-2 text-l font-semibold text-zinc-700">Faculty</p>

          </div>

    
          <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
            <div>
              <p className="font-bold text-zinc-700">Email</p>
            </div>

            <div>
              <p className="text-m font-semibold text-zinc-700">contact person email</p>
            </div>

          </div>

          <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
            <div>
              <p className="font-bold text-zinc-700">Phone</p>
            </div>

            <div>
              <p className="text-m font-semibold text-zinc-700">contact person phone</p>
            </div>
          </div>

        </div>
      </div>




      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      <div className="col-span-1 lg:col-span-9">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-zinc-700">contact person name</h2>
          <p className="mt-2 text-l font-semibold text-zinc-700">Faculty</p>

        </div>

  
        <div className="mt-6 grid grid-cols-3 gap-8 text-center items-center lg:text-left">
          <div>
            <p className="font-bold text-zinc-700">Email</p>
          </div>

          <div>
            <p className="text-m font-semibold text-zinc-700">contact person email</p>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-3 gap-8  text-center items-center lg:text-left">
          <div>
            <p className="font-bold text-zinc-700">Phone</p>
          </div>

          <div>
            <p className="text-m font-semibold text-zinc-700">contact person phone</p>
          </div>
        </div>

      </div>
    </div>




    </div>
  </div>
  );
};

export default Contact;
