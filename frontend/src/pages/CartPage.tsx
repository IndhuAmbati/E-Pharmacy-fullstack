// src/pages/CartPage.tsx
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

const availableCoupons: Coupon[] = [
  { code: "HEALTH10", discount: 10, type: "percentage" },
  { code: "SAVE20", discount: 20, type: "percentage" },
  { code: "FREESHIP", discount: 2.99, type: "fixed" },
  { code: "MEDS5", discount: 5, type: "fixed" },
];

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal: subtotal,
    itemCount,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) => c.code === couponCode.toUpperCase()
    );

    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, subtotal);
    }
  };

  const deliveryFee = itemCount > 0 ? 2.99 : 0;
  const discount = calculateDiscount();
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {itemCount > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      id={String(item.id)}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={item.image}
                      onUpdateQuantity={(id, quantity) =>
                        updateQuantity(Number(id), quantity)
                      }
                      onRemove={(id) => removeFromCart(Number(id))}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    {/* Coupon Section */}
                    <div className="pt-2 mt-2">
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1"
                        />
                        {appliedCoupon ? (
                          <Button variant="outline" onClick={removeCoupon}>
                            Remove
                          </Button>
                        ) : (
                          <Button onClick={applyCoupon}>Apply</Button>
                        )}
                      </div>
                      {appliedCoupon && (
                        <div className="text-green-600 text-sm mb-2">
                          Coupon applied: {appliedCoupon.code} (
                          {appliedCoupon.type === "percentage"
                            ? `${appliedCoupon.discount}% off`
                            : `₹${appliedCoupon.discount.toFixed(2)} off`}
                          )
                        </div>
                      )}
                      {couponError && (
                        <div className="text-red-600 text-sm">{couponError}</div>
                      )}
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full mt-6">Proceed to Checkout</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="w-full mt-2">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any medicines to your cart yet.
              </p>
              <Link to="/medicines">
                    <Button>Start Shopping</Button>
              </Link>

            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default CartPage;
