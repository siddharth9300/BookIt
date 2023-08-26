import React from 'react'

const styles = {
  width: `calc(100% - 2.5rem - 1rem)`,
  top: `50%`,
  transform: `translate(-50%, -50%)`
};




export const RequestSent = () => {

  return (
    <>
      {process.env.REACT_APP_HOD_FEATURE === "true" ?
        (
          <>
            <div className="w-full py-6">
              <div className="flex">
                <div className="w-1/3">
                  <div className="relative mb-2">
                    <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-white w-full">
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                          <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                        </svg>

                      </span>
                    </div>
                  </div>

                  <div className="text-s font-semibold text-center md:text-base">Request Sent</div>
                </div>


                <div className="w-1/3">
                  <div className="relative mb-2">
                    <div className="absolute flex align-center items-center align-middle content-center"
                      style={styles}
                    >
                      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className=" bg-indigo-700 py-1 rounded w-1/2"
                        //  style="width: 50%;"
                        ></div>
                      </div>
                    </div>

                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-gray-600 w-full">
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M456.13 873.522q-9.434-9.196-9.434-23.75 0-14.555 9.434-23.99l215.718-215.717H191.435q-14.674 0-24.37-9.695-9.695-9.696-9.695-24.37 0-14.674 9.695-24.37 9.696-9.695 24.37-9.695h480.413L456.13 325.978q-9.434-9.195-9.434-24.25 0-15.054 9.434-24.489 9.435-9.196 23.99-9.196 14.554 0 23.989 9.196L779 552.13q5.478 5.479 7.837 11.316 2.359 5.837 2.359 12.554 0 5.957-2.359 12.174T779 599.87L504.109 874.761q-9.435 9.435-23.989 8.815-14.555-.619-23.99-10.054Z" /></svg>
                      </span>
                    </div>
                  </div>

                  <div className="text-s font-semibold text-center md:text-base">Forwarded By HOD</div>
                </div>


                <div className="w-1/3">
                  <div className="relative mb-2">
                    <div className="absolute flex align-center items-center align-middle content-center  "
                      style={styles}        >
                      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className="w-0 bg-indigo-700 py-1 rounded" ></div>
                      </div>
                    </div>

                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-gray-600 w-full">
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                        </svg>


                      </span>
                    </div>
                  </div>
                  <div className="text-s font-semibold text-center md:text-base">Approved By Admin</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div class="w-full py-6">
              <div class="flex">
                <div class="w-1/4">
                  <div class="relative mb-2">
                    <div class="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                      <span class="text-center text-white w-full">
                        <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                          <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                        </svg>

                      </span>
                    </div>
                  </div>

                  <div class="text-xs text-center md:text-base">Request Sent</div>
                </div>


                <div class="w-1/4">
                  <div class="relative mb-2">
                    <div class="absolute flex align-center items-center align-middle content-center " style={styles}>
                      <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className="w-1/2 bg-indigo-700 py-1 rounded" ></div>
                      </div>
                    </div>

                    <div class="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                      <span class="text-center text-gray-600 w-full">
                        <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div class="text-xs text-center md:text-base">Approved By Admin</div>
                </div>



              </div>
            </div>
          </>
        )

      }
    </>


  )
}

export const ApprovedByHod = () => {

  return (
    <>


      <div className="w-full py-6">
        <div className="flex">
          <div className="w-1/3">
            <div className="relative mb-2">
              <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full">
                  <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                    <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                  </svg>

                </span>
              </div>
            </div>

            <div className="text-s font-semibold text-center md:text-base">Request Sent</div>
          </div>


          <div className="w-1/3">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center"
                style={styles}        >
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className=" bg-indigo-700 py-1 rounded w-full"
                  // style="width: 100%;"
                  ></div>
                </div>
              </div>

              <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full">
                  <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M456.13 873.522q-9.434-9.196-9.434-23.75 0-14.555 9.434-23.99l215.718-215.717H191.435q-14.674 0-24.37-9.695-9.695-9.696-9.695-24.37 0-14.674 9.695-24.37 9.696-9.695 24.37-9.695h480.413L456.13 325.978q-9.434-9.195-9.434-24.25 0-15.054 9.434-24.489 9.435-9.196 23.99-9.196 14.554 0 23.989 9.196L779 552.13q5.478 5.479 7.837 11.316 2.359 5.837 2.359 12.554 0 5.957-2.359 12.174T779 599.87L504.109 874.761q-9.435 9.435-23.989 8.815-14.555-.619-23.99-10.054Z" /></svg>
                </span>
              </div>
            </div>

            <div className="text-s font-semibold text-center md:text-base">Approved By HOD</div>
          </div>


          <div className="w-1/3">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center"
                style={styles}        >
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className=" bg-indigo-700 py-1 rounded w-1/2"
                  //  style="width: 50%;"
                  ></div>
                </div>
              </div>

              <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-gray-600 w-full">
                  <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                  </svg>


                </span>
              </div>
            </div>
            <div className="text-s font-semibold text-center md:text-base">Approved By Admin</div>
          </div>
        </div>
      </div>

    </>
  )
}



export const ApprovedByAdmin = () => {

  return (
    <>
      { process.env.REACT_APP_HOD_FEATURE === "true" ?
        (
          <>
            <div className="w-full py-6">
              <div className="flex">
                <div className="w-1/3">
                  <div className="relative mb-2">
                    <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-white w-full">
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                          <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                        </svg>

                      </span>
                    </div>
                  </div>

                  <div className="text-s font-semibold text-center md:text-base">Request Sent</div>
                </div>


                <div className="w-1/3">
                  <div className="relative mb-2">
                    <div className="absolute flex align-center items-center align-middle content-center" style={styles} >
                      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className=" bg-indigo-700 py-1 rounded w-full"></div>
                      </div>
                    </div>

                    <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-white w-full">
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M456.13 873.522q-9.434-9.196-9.434-23.75 0-14.555 9.434-23.99l215.718-215.717H191.435q-14.674 0-24.37-9.695-9.695-9.696-9.695-24.37 0-14.674 9.695-24.37 9.696-9.695 24.37-9.695h480.413L456.13 325.978q-9.434-9.195-9.434-24.25 0-15.054 9.434-24.489 9.435-9.196 23.99-9.196 14.554 0 23.989 9.196L779 552.13q5.478 5.479 7.837 11.316 2.359 5.837 2.359 12.554 0 5.957-2.359 12.174T779 599.87L504.109 874.761q-9.435 9.435-23.989 8.815-14.555-.619-23.99-10.054Z" /></svg>
                      </span>
                    </div>
                  </div>

                  <div className="text-s font-semibold text-center md:text-base">Approved By HOD</div>
                </div>


                <div className="w-1/3">
                  <div className="relative mb-2">
                    <div className="absolute flex align-center items-center align-middle content-center" style={styles} >
                      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div className=" bg-indigo-700 py-1 rounded w-full"></div>
                      </div>
                    </div>

                    <div className="w-10 h-10 mx-auto bg-green-600 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-white w-full">
                        <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                        </svg>


                      </span>
                    </div>
                  </div>
                  <div className="text-s font-semibold text-center md:text-base">Approved By Admin</div>
                </div>
              </div>
            </div>





          </>
        ) : (
          <>


            <div class="w-full py-6">
              <div class="flex">
                <div class="w-1/4">
                  <div class="relative mb-2">
                    <div class="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                      <span class="text-center text-white w-full">
                        <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                          <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                        </svg>

                      </span>
                    </div>
                  </div>

                  <div class="text-xs text-center md:text-base">Request Sent</div>
                </div>


                <div class="w-1/4">
                  <div class="relative mb-2">
                    <div class="absolute flex align-center items-center align-middle content-center" style={styles}>
                      <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div class="w-full bg-indigo-700 py-1 rounded" ></div>
                      </div>
                    </div>

                    <div class="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                      <span class="text-center text-white w-full">
                        <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                        </svg>


                      </span>
                    </div>
                  </div>
                  <div class="text-xs text-center md:text-base">Approved By Admin</div>
                </div>


              </div>


              </div>

          </>
            
            )

      }

    </>


        )
      }


export const RejectedByHod = () => {

  return (
      <>


        <div className="w-full py-6">
          <div className="flex">
            <div className="w-1/3">
              <div className="relative mb-2">
                <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-white w-full">
                    <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                      <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                    </svg>

                  </span>
                </div>
              </div>

              <div className="text-s font-semibold text-center md:text-base">Request Sent</div>
            </div>


            <div className="w-1/3">
              <div className="relative mb-2">
                <div className="absolute flex align-center items-center align-middle content-center" style={styles} >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div className=" bg-indigo-700 py-1 rounded w-full">
                    </div>
                  </div>
                </div>

                <div className="w-10 h-10 mx-auto bg-red-600 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-white w-full">
                    <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 623.739 272.87 830.87q-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87L432.261 576 225.13 368.87q-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87 10.196-10.195 23.87-10.195 13.674 0 23.87 10.195L480 528.261 687.13 321.13q10.196-10.195 23.87-10.195 13.674 0 23.87 10.195 10.195 10.196 10.195 23.87 0 13.674-10.195 23.87L527.739 576 734.87 783.13q10.195 10.196 10.195 23.87 0 13.674-10.195 23.87-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195L480 623.739Z" /></svg>


                  </span>
                </div>
              </div>

              <div className="text-s font-semibold text-center md:text-base">Rejected By HOD</div>
            </div>


            <div className="w-1/3">
              <div className="relative mb-2">
                <div className="absolute flex align-center items-center align-middle content-center" style={styles} >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div className="w-0 bg-indigo-700 py-1 rounded" ></div>
                  </div>
                </div>

                <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-gray-600 w-full">
                    <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                    </svg>


                  </span>
                </div>
              </div>
              <div className="text-s font-semibold text-center md:text-base">Approved By Admin</div>
            </div>
          </div>
        </div>




      </>
      )
}


export const RejectedByAdmin = () => {

return (
      <>
        {process.env.REACT_APP_HOD_FEATURE === "true" ?
          (
            <>
              <div className="w-full py-6">
                <div className="flex">
                  <div className="w-1/3">
                    <div className="relative mb-2">
                      <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-white w-full">
                          <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                            <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                          </svg>

                        </span>
                      </div>
                    </div>

                    <div className="text-s font-semibold text-center md:text-base">Request Sent</div>
                  </div>


                  <div className="w-1/3">
                    <div className="relative mb-2">
                      <div className="absolute flex align-center items-center align-middle content-center" style={styles} >
                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                          <div className=" bg-indigo-700 py-1 rounded w-full"></div>
                        </div>
                      </div>

                      <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-white w-full">
                          <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M456.13 873.522q-9.434-9.196-9.434-23.75 0-14.555 9.434-23.99l215.718-215.717H191.435q-14.674 0-24.37-9.695-9.695-9.696-9.695-24.37 0-14.674 9.695-24.37 9.696-9.695 24.37-9.695h480.413L456.13 325.978q-9.434-9.195-9.434-24.25 0-15.054 9.434-24.489 9.435-9.196 23.99-9.196 14.554 0 23.989 9.196L779 552.13q5.478 5.479 7.837 11.316 2.359 5.837 2.359 12.554 0 5.957-2.359 12.174T779 599.87L504.109 874.761q-9.435 9.435-23.989 8.815-14.555-.619-23.99-10.054Z" /></svg>
                        </span>
                      </div>
                    </div>

                    <div className="text-s font-semibold text-center md:text-base">Forwarded By HOD</div>
                  </div>


                  <div className="w-1/3">
                    <div className="relative mb-2">
                      <div className="absolute flex align-center items-center align-middle content-center" style={styles} >
                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                          <div className=" bg-indigo-700 py-1 rounded w-full"></div>
                        </div>
                      </div>

                      <div className="w-10 h-10 mx-auto bg-red-600 rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-white w-full">
                          <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 623.739 272.87 830.87q-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87L432.261 576 225.13 368.87q-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87 10.196-10.195 23.87-10.195 13.674 0 23.87 10.195L480 528.261 687.13 321.13q10.196-10.195 23.87-10.195 13.674 0 23.87 10.195 10.195 10.196 10.195 23.87 0 13.674-10.195 23.87L527.739 576 734.87 783.13q10.195 10.196 10.195 23.87 0 13.674-10.195 23.87-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195L480 623.739Z" /></svg>



                        </span>
                      </div>
                    </div>
                    <div className="text-s font-semibold text-center md:text-base">Rejected By Admin</div>
                  </div>
                </div>
              </div>

            </>
          ) : (
            <>




              <div class="w-full py-6">
                <div class="flex">
                  <div class="w-1/4">
                    <div class="relative mb-2">
                      <div class="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                        <span class="text-center text-white w-full">
                          <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="24" height="24">
                            <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                            </svg>
                        </span>
                      </div>
                    </div>

                    <div class="text-xs text-center md:text-base">Request Sent</div>
                  </div>


                  <div class="w-1/4">
                    <div class="relative mb-2">
                      <div class="absolute flex align-center items-center align-middle content-center" style={styles}>
                        <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                          <div class="w-full bg-indigo-700 py-1 rounded" ></div>
                        </div>
                      </div>

                      <div class="w-10 h-10 mx-auto bg-red-600 rounded-full text-lg text-white flex items-center">
                        <span class="text-center text-white w-full">
                          <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 623.739 272.87 830.87q-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87L432.261 576 225.13 368.87q-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87 10.196-10.195 23.87-10.195 13.674 0 23.87 10.195L480 528.261 687.13 321.13q10.196-10.195 23.87-10.195 13.674 0 23.87 10.195 10.195 10.196 10.195 23.87 0 13.674-10.195 23.87L527.739 576 734.87 783.13q10.195 10.196 10.195 23.87 0 13.674-10.195 23.87-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195L480 623.739Z" /></svg>



                        </span>
                      </div>
                    </div>
                    <div class="text-xs text-center md:text-base">Rejected By Admin</div>
                  </div>


                </div>
              </div>



            </>
          )

        }
      </>


      )
}