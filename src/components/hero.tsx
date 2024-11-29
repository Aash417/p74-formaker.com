import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
   return (
      <section className="relative bg-gray-50">
         <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
            <img
               className="h-full w-auto"
               src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
               alt=""
            />
         </div>

         <header className="relative py-4 md:py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Image
                        src="/logo.svg"
                        alt="logo"
                        width={30}
                        height={30}
                        className="m-0 p-0"
                     />

                     <span className="text-2xl">Formaker.com</span>
                  </div>

                  <div className="hidden lg:ml-16 lg:flex lg:items-center lg:justify-center lg:space-x-10">
                     <Link
                        href="/auth/sign-in"
                        title=""
                        className="font-pj rounded-xl border border-gray-900 bg-transparent px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        role="button"
                     >
                        Get started
                     </Link>
                  </div>
               </div>
            </div>
         </header>

         <section className="relative py-12 sm:py-16 lg:pb-36 lg:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 gap-y-8 sm:gap-y-20 lg:grid-cols-2 lg:items-center xl:grid-cols-5">
                  <div className="text-center md:px-16 lg:px-0 lg:text-left xl:col-span-2">
                     <div className="mx-auto max-w-sm sm:max-w-md md:max-w-full">
                        <h1 className="font-pj text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                           EASIEST ONLINE FORM BUILDER
                        </h1>

                        <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                           <div className="flex flex-shrink-0 justify-center -space-x-4 overflow-hidden lg:justify-start">
                              <img
                                 className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
                                 src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png"
                                 alt=""
                              />
                              <img
                                 className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
                                 src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png"
                                 alt=""
                              />
                              <img
                                 className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
                                 src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png"
                                 alt=""
                              />
                           </div>

                           <p className="font-pj mt-4 text-lg text-gray-900 lg:ml-4 lg:mt-0">
                              Empower anyone on your team to build custom,
                              scalable, and secure online forms in seconds.
                           </p>
                        </div>
                     </div>

                     <div className="mt-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 lg:mt-12 lg:justify-start">
                        <a
                           href="/dashboard"
                           title=""
                           className="font-pj justif-center inline-flex items-center rounded-xl border border-transparent bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                           role="button"
                        >
                           Start building form
                        </a>
                     </div>
                  </div>

                  <div className="xl:col-span-3">
                     <img
                        className="mx-auto w-full scale-110"
                        src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png"
                        alt=""
                     />
                  </div>
               </div>
            </div>
         </section>
      </section>
   );
}
