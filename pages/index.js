import Layout from "../components/layout";
export default function Home() {
  return (
    <Layout>
      <div className="h-screen">
        <div>
          <div className="relative w-full sm:w-8/12 md:w-7/12 lg:w-1/2 mx-auto py-24">
            <div className="bg-gold transform rotate-2 w-full m-auto h-16 absolute inset-0"></div>
            <div className="bg-gray-700 w-full m-auto h-16 absolute inset-0 transform rotate-1"></div>

            <h2 className="text-white md:text-5xl sm:text-4xl text-3xl relative z-10 text-center leading-none text-shadow-lg font-display">
              Cloud 9 Coffee
            </h2>
          </div>
          <div>
            <div className="relative w-10/12 sm:w-8/12 md:w-7/12 lg:w-1/2  py-8">
              <h2 className="text-gray-700 md:text-5xl sm:text-4xl text-3xl relative z-10 text-center leading-none text-shadow-lg font-display">
                Instructions
              </h2>
            </div>
            <div className="w-3/4">
              <p className="leading-relaxed py-4">
                This app was created to help in the ordering and delivery
                process of the Cloud 9 Coffee Shop at Hugoton High School.
                Please use respectfully. Follow the instructions listed below:
              </p>
              <ol className="list-decimal text-lg">
                <li className="py-2">
                  Sign in with your school issued Google account. Any account
                  that is not of the usd210.org domain is not allowed to sign
                  in.
                </li>
                <li className="py-2">
                  Go to the Menu page to begin building your order.
                </li>
                <li className="py-2">Check out from the cart.</li>
                <li className="py-2">
                  In the checkout form, be sure to be as descriptive as you can
                  on the delivery location.
                </li>
                <li className="py-2">
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
