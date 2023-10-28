import { FC } from "react";

const orderComplete: FC = () => {
  return (
    <>
      <div className="min-h-screen relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="../../../video/vhsOrderBG.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">Thanks for Your Order!</h1>
          <p className="text-xl">Your order has been successfully processed.</p>
        </div>
      </div>
    </>
  );
};

export default orderComplete;
