import Layout from "../../components/layout";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { getCustomer } from "../../src/graphql/queries";
import { updateCustomer } from "../../src/graphql/mutations";
import { useEffect, useState } from "react";

const Customer = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [customer, setCustomer] = useState();

  const getMyCustomer = async () => {
    const {
      data: { getCustomer: myCustomer },
    } = await API.graphql({
      query: getCustomer,
      variables: {
        id,
      },
    });
    setCustomer(myCustomer);
  };

  useEffect(() => {
    getMyCustomer();
  }, [id]);

  return (
    <Layout>
      <div>
        <div className="text-3xl font-display text-gray-800 p-6 text-center">
          <h3>Edit Customer</h3>
        </div>

        <div className=" w-1/2 mx-auto p-12">
          <div className="text-gray-900 text-xl text-center flex justify-center items-center pb-6">
            <span className="text-gray-500 text-base mr-4">Customer: </span>
            <p> {customer && customer.customerEmail}</p>
          </div>
          {customer && (
            <Formik
              initialValues={{
                hasLoyaltyCard: customer ? customer.hasLoyaltyCard : "",
              }}
              onSubmit={async (values) => {
                await API.graphql({
                  query: updateCustomer,
                  variables: {
                    input: {
                      id: customer.id,
                      hasLoyaltyCard: values.hasLoyaltyCard,
                    },
                  },
                });
                router.back();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                      <label
                        className="text-gray-900 w-1/4 md:w-1/2"
                        htmlFor="hasLoyaltyCard"
                      >
                        Has Loyalty Card
                      </label>
                      <Field
                        className="form-select w-full"
                        name="hasLoyaltyCard"
                        as="select"
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </Field>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="border border-blue-400 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Customer;
