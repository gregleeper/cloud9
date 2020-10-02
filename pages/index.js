import Layout from "../components/layout";
import Link from "next/link";
export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen">
        <div>
          <div className="relative w-full sm:w-8/12 md:w-7/12 lg:w-1/2 mx-auto py-24">
            <div className="bg-gold transform rotate-2 w-full m-auto h-16 absolute inset-0"></div>
            <div className="bg-blue-900 w-full m-auto h-16 absolute inset-0 transform rotate-1"></div>

            <h2 className="text-white md:text-5xl sm:text-4xl text-3xl relative z-10 text-center leading-none text-shadow-lg font-display">
              Cloud 9 Coffee
            </h2>
          </div>
          <div className=" max-w-2xl mx-auto">
            <div className="text-center  relative  pt-16 mx-auto">
              <div className="flex justify-center relative">
                <p className="h-16 leading-none relative">
                  <h2 className="text-gray-700 text-5xl relative leading-none text-shadow-lg font-display">
                    Instructions
                  </h2>
                  <svg
                    className="absolute pointer-events-none h-24 w-72 fill-current text-gold"
                    style={{ top: "-30px", left: "-50px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-35 -50 920.39 800.7"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M462,3.75c-.5,6.13,16.09,3.82,19.83,5.29,22.56,2.49,45.19,4.25,67.65,8,60.58,12.58,121.24,36,173.47,77.56,78.41,68.46,145.35,171.16,133.61,298.51-12.12,74.69-55.06,134-101.87,178.91.22-.22.44-.44.67-.65-42.7,42-91,73.77-140.72,100.33l.37-.19-.78.41.06,0c-95.62,53.07-203.61,63-306.45,47l.68.12c-48.06-8.52-96.18-21.09-141.15-44.64l.12.07C92.24,634,16.51,558,6,449.25c0,.22,0,.45.08.68-12.28-119,32.81-225.41,107-296L113,154l.37-.36-.21.21C228.13,46.64,381,19.65,520.13,42.31l-.4-.07c52.58,8.91,104.44,25.68,153.34,51.83L673,94c34.34,19.21,70.22,40.67,94.26,78.4l-.13-.23.19.33,0-.07c9.49,15.46,16.23,34.5,15.86,54.34.6,2.92-1.93,10.83.74,11.75,7.37-29.54-9-63.49-26-84C718.38,109.31,666.77,85,616.75,64.7,510.65,25.1,396.28,19,288.43,51.07,168,84,40.41,176.89,7.54,336.82c-24.42,127.25,11.19,229.06,96.55,300.87,86.22,72.53,193.53,93.61,295.36,95,53.49-.53,106.85-8.08,158.47-26.23,39.54-14.15,77.14-36.31,113.92-59.26C752.35,594,836.63,519.16,862,403c6.11-49.31.42-101.72-15.83-147.2-21.7-60.56-59.14-109.6-99.88-150.55-36.21-36.81-80-59.13-124.15-75.95-40.6-16.58-83-23.51-125.45-26.48Q484.56,1.66,472.41.63c-3.34.08-9.78-2.8-10.42,3.12ZM349.73,41.16h0ZM197.13,92.22l-.32.17.32-.17Zm475.61,1.67L673,94l-.22-.12Zm71.57,50.05a2.09,2.09,0,0,0,.22.2,2.09,2.09,0,0,1-.22-.2Zm-654.24,474,.2.2-.2-.2Zm77.46,56.51.39.21-.39-.21ZM472.05,720.1l-.39.07.39-.07Zm142.23-48.2.35-.19-.35.19Zm153-499.44,0,0,0,0ZM113.14,153.87l0,0,.09-.08,0,0Z"
                      fill="currentColor"
                      stroke-width="7"
                      stroke="currentColor"
                    ></path>
                  </svg>
                </p>
              </div>

              <svg
                className="relative h-38 w-30 fill-current text-gold "
                style={{ top: "-18px", left: "300px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 208.54 208.54"
              >
                <path
                  d="M166.22,111h0c-27.75-34-64-68.92-110-72C47.08,21.48,31.3,7,12.37,1.13,9.3.84,1.39-1.63,0,1.8A1.6,1.6,0,0,0,1.55,3.44C23.34,3,42,20.88,52.17,38.81,32.07,37-13.6,52.12,13.13,76.48,43.23,100.67,76.18,82,58.52,43.92c10.46.69,20.59,3.73,30.16,7.92l-.08,0C123.47,68,151.3,97,172.76,128.41c9.5,14.07,15.28,31.09,24.36,44.93,7-.21-.36-9.06-1.41-12.42-8.64-17.32-17.23-34.82-29.49-49.93ZM122.74,73.25h0l-.13-.1.13.1ZM54.58,43.7C77.78,96,15.17,88.4,10.27,61,16.88,45.08,39.6,44.05,54.58,43.7Zm1.62,3.94c0,.07,0,.14.08.22,0-.08-.05-.15-.08-.22ZM9.75,3.8h0l-.11,0,.11,0ZM43,44.05h0l-.19,0,.19,0Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M208.54,156.54c-.43,5.7-3.87,11.27-5.36,16.9a1.55,1.55,0,0,1-1.89,1c-2.55-1.23.31-4.49.57-6.45-2.06,2-1.8,6.68-5.19,6.6-1.5,7.14-16.94-7.51-20.46-9.33l.54.44a2.87,2.87,0,0,1,.05-5.08c6.9.11,13.22,6.45,19.72,9,2.55-2,9.15-16.78,12-13.11Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="pb-24 mx-auto">
              <p className="leading-relaxed py-4">
                This app was created to help in the ordering and delivery
                process of the Cloud 9 Coffee Shop at Hugoton High School.
                <em>
                  {" "}
                  <strong>Please use respectfully</strong>
                </em>
                . Follow the instructions listed below:
              </p>
              <ol className="list-decimal text-lg list-inside">
                <li className="py-2 px-4 bg-blue-900 text-white transform -rotate-1 my-6">
                  Sign in with your school issued Google account. Any account
                  that is not of the usd210.org domain is not allowed to sign
                  in.
                </li>
                <li className="py-2 px-4 bg-blue-900 text-white transform rotate-1 my-6">
                  Go to the{" "}
                  <Link href="/menu">
                    <a className="text-gold font-bold transform hover:-rotate-1 hover:underline">
                      Menu
                    </a>
                  </Link>{" "}
                  page to begin building your order.
                </li>
                <li className="py-2 px-4  bg-blue-900 text-white transform -rotate-1 ny-6">
                  Check out from the{" "}
                  <Link href="/cart">
                    <a className="text-gold font-bold transform hover:rotate-1 hover:underline">
                      Cart
                    </a>
                  </Link>
                  .
                </li>
                <li className="py-2 px-4  bg-blue-900 text-white transform rotate-1 my-6">
                  In the checkout form, be sure to be as descriptive as you can
                  on the delivery location.
                </li>
                <li className="py-2 px-4  bg-blue-900 text-white transform -rotate-1 my-6">
                  Please indicate the dollar amount you will be paying with so
                  that correct change can be brought along with your order.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
