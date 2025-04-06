
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const [items, setItems] = useState<CartItemType[]>([
    {
      id: "1",
      name: "Paracetamol 500mg",
      price: 5.99,
      quantity: 2,
      image: "https://picsum.photos/seed/paracetamol/200/200",
    },
    {
      id: "2",
      name: "Ibuprofen 200mg",
      price: 6.49,
      quantity: 1,
      image: "https://picsum.photos/seed/ibuprofen/200/200",
    },
    {
      id: "3",
      name: "Cetirizine 10mg",
      price: 7.99,
      quantity: 1,
      image: "https://picsum.photos/seed/cetirizine/200/200",
    },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const total = calculateSubtotal() + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
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
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full mt-6">
                      Proceed to Checkout
                    </Button>
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
              <Link to="/">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
