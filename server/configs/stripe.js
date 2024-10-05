import Stripe from "stripe";
const stripe = new Stripe('sk_test_51Og4CySBp6uwL0aNuq8C0Av5pwoilELAJb1ROS2WmxjaoDOavNAFY5ZNbj9KEak9i5YcIhvt5bINfKsNSn2AbQUT00Ho2LGA8q',{
    apiVersion:'2023-10-16',
});

export default stripe;