
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, quantity + amount);
    onUpdateQuantity(id, newQuantity);
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="h-16 w-16 overflow-hidden rounded-md">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">Unit Price: ${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(-1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <p className="font-medium w-20 text-right">${(price * quantity).toFixed(2)}</p>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
