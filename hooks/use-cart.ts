import { useCartContext, type CartItem } from "@/components/cart-provider"

export function useCart() {
  const { state, dispatch } = useCartContext()

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: number, size: string, color: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size, color } })
  }

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, color, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
  }
}
