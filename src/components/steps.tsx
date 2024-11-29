export default function HowItWorks() {
   return (
      <section className="bg-white py-10 sm:py-16 lg:py-24">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
               <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                  How does it work?
               </h2>
            </div>

            <div className="relative mt-12 lg:mt-20">
               <div className="absolute inset-x-0 top-2 hidden md:block md:px-20 lg:px-28 xl:px-44">
                  <img
                     className="w-full"
                     src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                     alt=""
                  />
               </div>

               <div className="relative grid grid-cols-1 gap-x-12 gap-y-12 text-center md:grid-cols-3">
                  <div>
                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                        <span className="text-xl font-semibold text-gray-700">
                           1
                        </span>
                     </div>
                     <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                        Create a free account
                     </h3>
                     <p className="mt-4 text-base text-gray-600">
                        Seamlessly create a free account with google. No
                        password hassel.
                     </p>
                  </div>

                  <div>
                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                        <span className="text-xl font-semibold text-gray-700">
                           2
                        </span>
                     </div>
                     <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                        Build your form
                     </h3>
                     <p className="mt-4 text-base text-gray-600">
                        Start crafting you questionnaire &#38; add variety of
                        question formats
                     </p>
                  </div>

                  <div>
                     <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow">
                        <span className="text-xl font-semibold text-gray-700">
                           3
                        </span>
                     </div>
                     <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                        Collect responses
                     </h3>
                     <p className="mt-4 text-base text-gray-600">
                        Share your form link with your audiance. Get responses
                        from across the globe.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
