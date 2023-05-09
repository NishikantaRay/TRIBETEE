import React from 'react'
import { useUser } from '../utils/authContext';
import { fetchDataFromApi } from "@/utils/api";
import { getAllProductsName } from '@/utils/helper';

function profile({ orders }) {
    const { user } = useUser();
    return (
        <div>
            {user ? (
                <div className="container mx-auto px-4 sm:px-8">
                    {
                        user ? (
                            <div className='pt-8'>
                                <h1 className="text-4xl font-semibold text-center uppercase">Hyy {user}</h1>
                            </div>
                        ) : (
                            '')
                    }

                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Your Previous Orders</h2>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div
                                className="inline-block min-w-full rounded-lg overflow-hidden"
                            >
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr><th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            ID
                                        </th>

                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Products
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Date of Order
                                            </th>


                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            orders?.data.map((order, i) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{i + 1}</p>

                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <div className="flex">
                                                                    <div className="ml-3">
                                                                        {
                                                                            getAllProductsName(order.attributes.products).map(
                                                                                (name) => {
                                                                                    return (
                                                                                        <div>
                                                                                            <p className="text-gray-600 whitespace-no-wrap">{name}</p>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">

                                                                    ₹{
                                                                        order.attributes.products.map((product) => {
                                                                            return (product.oneQuantityPrice) * product.quantity;
                                                                        }).flat().reduce((total, val) => total + val, 0)
                                                                    }
                                                                </p>

                                                            </td>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{
                                                                    order.attributes.createdAt.split('T')[0]
                                                                }</p>

                                                            </td>


                                                        </tr>
                                                    </>
                                                )

                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : "NO DATA FOUND"}
        </div>

    )
}




export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie;
    const params = cookies.split("; ");
    let id = null;
    params.forEach(param => {
        const [key, value] = param.split("=");
        if (key === "id") {
            id = value;
        }
    });
    const orders = await fetchDataFromApi(`/api/orders?filters[userid][$eq]=${id}&sort[0]=createdAt%3Adesc`);

    return {
        props: {
            orders
        }
    }
}
export default profile