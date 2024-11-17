import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg 
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm0 21.813c-5.411 0-9.812-4.401-9.812-9.812S6.589 2.188 12 2.188 21.812 6.589 21.812 12 17.411 21.813 12 21.813zm6.293-13.413l-7.781 7.781-3.293-3.293a1.004 1.004 0 00-1.417 1.417l4 4c.391.391 1.024.391 1.417 0l8.5-8.5a1.004 1.004 0 10-1.417-1.417z"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a nice day!</p>
          <div className="py-10 text-center">
            <Link 
              to="/home"
              className="px-12 bg-buttonBgColor text-white font-semibold py-3"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
