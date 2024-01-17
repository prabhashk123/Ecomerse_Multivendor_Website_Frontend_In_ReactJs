import { UserContext, CartContext } from "./Context";
import { useContext } from "react";
import { useState } from "react";
// Third pairty
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useRazorpay from "react-razorpay";
import { CurrencyContext } from "./Context";

function ConfirmOrder() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ConfirmOrder, setConfirmOrder] = useState(false);
    const [orderId, setorderId] = useState('');
    const [orderAmount, setorderAmount] = useState('');
    const [OrderStatus, setOrderStatus] = useState(false);
    const { cartData, setCartData } = useContext(CartContext);
    const [PayMethod, setPayMethod] = useState('');
    const userContext = useContext(UserContext);
    const { CurrencyData } = useContext(CurrencyContext);
    const [Razorpay] = useRazorpay();

    // Coditions at login
    if (userContext == null) {
        window.Location.href = '/customer/login';
    } else {
        if (ConfirmOrder == false) {
            addOrderInTable();
        }
    }
    // Add order in table function
    function addOrderInTable() {
        const customerId = localStorage.getItem('customer_id');
        // for currency
        var total_amount = 0;
        var total_usd_amount = 0;
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
            total_amount += parseFloat(cart.product.price);
            total_usd_amount += parseFloat(cart.product.usd_price);
        });

        const formData = new FormData()
        formData.append('customer', customerId);
        formData.append('total_amount', total_amount);
        formData.append('total_usd_amount', total_usd_amount);

        // Submit Data
        axios.post(baseUrl + '/orders/', formData)
            .then(function (response) {
                console.log(response.data);
                var orderId = response.data.id;
                setorderId(orderId);
                if (CurrencyData == 'usd') {
                    setorderAmount(response.data.total_usd_amount);

                } else {
                    setorderAmount(response.data.total_amount);
                }
                OrderItems(orderId);
                setConfirmOrder(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Function for order update
    function updateOrderStatus(order_status, transData = {}) {
        const trans_data = new FormData();
        if (transData) {
            trans_data.append('trans_ref', transData.trans_ref);
            trans_data.append('payment_mode', transData.payment_mode);
        }

        // Submit Data
        axios.post(baseUrl + '/update-order-status/' + orderId + '/', trans_data)
            .then(function (response) {
                // console.log(response);
                window.location.href = '/order/success';
            })
            .catch(function (error) {
                window.location.href = '/order/faliure';
                console.log(error);
            });
    }
    // fuction for geting order items in database
    function OrderItems(order_id) {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        // console.log(cartJson);
        if (cartJson != null) {
            cartJson.map((cart, index) => {
                const formData = new FormData();
                formData.append('order', order_id);
                formData.append('product', cart.product.id);
                formData.append('quantity', 1);
                formData.append('price', cart.product.price);
                formData.append('usd_price', cart.product.usd_price);

                // Submit data
                axios.post(baseUrl + '/orderitems/', formData)
                    .then(function (response) {
                        // remove cart item from local storage
                        cartJson.splice(index, 1)
                        // overite and save local storage
                        localStorage.setItem('cartData', JSON.stringify(cartJson))
                        setCartData(cartJson)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }
    // For Payment
    function changePaymentMethod(payMethod) {
        setPayMethod(payMethod);
    }

    // For pay now button
    function PayNowButton() {
        if (PayMethod == 'razorpay') {
            razorPayhandler()
        }
        if (PayMethod != '') {
            changePaymentMethod(PayMethod);
        } else {
            alert('Select Payment Method!!');
        }
    }
    // function for razorpay
    function razorPayhandler() {
        var razorPayData = new FormData();
        var order_amount = orderAmount * (100);
        razorPayData.append('amount', order_amount);
        razorPayData.append('order_id', orderId);
        // Submit Data
        axios.post(baseUrl + '/create-razorpay-order/', razorPayData)
            .then(function (response) {
                // console.log(response);
                if (response.data.bool == true) {
                    const options = {
                        key: "rzp_test_rkn1lHi2O6nncL",
                        amount: orderAmount,
                        currency: "INR",
                        name: "Acme Corp",
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: response.data.data.id,
                        handler: (res) => {
                            updateOrderStatus(true, {
                                'trans_ref': res.razorpay_payment_id,
                                'payment_mode': 'razorpay'
                            });
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };

                    const rzpay = new Razorpay(options);
                    rzpay.on("payment.falled", function (response) {
                        window.location.href = '/order/faliure';
                    })
                    rzpay.open();
                }
                // window.location.href = '/order/success';
            })
            .catch(function (error) {
                console.log(error);
                window.location.href = '/order/faliure';
            });
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-6 offset-3">
                    <div className="card text-center text-success py-3">
                        <h3><i className="fa fa-check-circle text-success"></i> Your order has been confirmed!</h3>
                        <h5>Order Id: {orderId}</h5>
                    </div>
                    <div className="card p-3 mt-4">
                        <form>
                            {
                                CurrencyData == 'usd' &&
                                // becuse two element for add parent ellement <></>
                                <>
                                    <div className="form-group">
                                        <label>
                                            <input type="radio" onChange={() => changePaymentMethod('paypal')} name="payMethod" /> PayPal
                                        </label>
                                    </div>
                                </>
                            }

                            {
                                CurrencyData != 'usd' &&
                                <>
                                    <div className="form-group">
                                        <label>
                                            <input type="radio" onChange={() => changePaymentMethod('razorpay')} name="payMethod" /> RazorPay
                                        </label>
                                    </div>
                                </>
                            }
                            <button type="button" onClick={PayNowButton} className="btn btn-sm btn-primary">Pay Now</button>
                        </form>
                        {PayMethod == 'paypal' &&
                            <PayPalScriptProvider options=
                                {{ "client-id": "AQgIUz6g-j1n78KZQELr1e_BFsvrjsobQbsqII3Xrj8O_vaL29zvf3h-V31BJ4CkqzRyFnyjRzPWzqrg" }}>
                                <PayPalButtons className="mt-3"
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: orderAmount,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            // alert(`Transaction completed by ${name}`);
                                            // setOrderStatus(true);
                                            updateOrderStatus(true, {
                                                // 'trans_ref': details.id,
                                                'payment_mode': 'paypal'
                                            });
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}
export default ConfirmOrder;