import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isOngoing, setOngoing] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [amount, setAmount] = useState({ subtotal: 0, discount: 0, tax: 0, total: 0, change: 0, cash: 0, items: 0 });

  const handleResetOrder = (orderId) => {
    setOrders([]);
    setErrors(null);
    setComplete(false);
    setOngoing(false);
    setAmount({ subtotal: 0, discount: 0, tax: 0, total: 0, change: 0, cash: 0, items: 0 });
  };

  const handleAddOrder = (order) => {
    const stock = order.stock - 1;
    const data = { ...order, stock, quantity: 1 };

    const exisitingOrder = orders.find((item) => item._id === order._id);

    if (!exisitingOrder) {
      setOrders((prevOrders) => [...prevOrders, data]);
    } else {
      handleAddQuantity(order._id, 1);
    }

    setOngoing(true);
  };

  const handleRemoveOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  };

  const handleAddQuantity = (orderId, quantityToAdd = 1) => {
    setOrders((prevOrders) => {
      return prevOrders.map((item) => {
        if (item._id === orderId && item.stock > 0) {
          return {
            ...item,
            quantity: item.quantity + quantityToAdd,
            stock: item.stock - quantityToAdd,
          };
        }
        return item;
      });
    });
  };

  const handleRemoveQuantity = (orderId, quantityToRemove = 1) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            quantity: Math.max(0, order.quantity - quantityToRemove),
            stock: order.stock + quantityToRemove,
          };
        }
        return order;
      });
    });
  };

  const handleUpdateOrder = (orderId, updates) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            ...updates,
          };
        }
        return order;
      });
    });
  };

  const handleCalculateChange = (cashProvided, discountPercentage = 0) => {
    const discount = discountPercentage / 100;
    const discountAmount = discount * amount.subtotal;
    const total = amount.total - discountAmount;
    const change = cashProvided - total;

    setAmount((prevAmount) => ({
      ...prevAmount,
      total,
      discount: discountAmount,
      change,
      cash: cashProvided,
    }));
    setOngoing(false);
    setComplete(true);
  };

  const calculate = () => {
    const subtotal = orders.reduce((total, order) => {
      return total + order.quantity * order.price;
    }, 0);

    const items = orders?.length;

    const taxRate = 0.12; // 12%
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    setAmount((prevAmount) => ({
      ...prevAmount,
      subtotal,
      tax,
      total,
      items,
    }));
  };

  useEffect(() => {
    orders.length > 0
      ? calculate()
      : setAmount({ subtotal: 0, discount: 0, tax: 0, total: 0, change: 0, cash: 0, items: 0 });
  }, [orders]);

  const orderValue = {
    isOngoing,
    isComplete,
    isPrescriptionRequired: orders.filter((item) => item.isPrescriptionRequired).length > 0,
    orders,
    amount,
    handleAddOrder,
    handleRemoveOrder,
    handleAddQuantity,
    handleRemoveQuantity,
    handleUpdateOrder,
    handleCalculateChange,
    handleResetOrder,
    errors,
  };

  return <OrderContext.Provider value={orderValue}>{children}</OrderContext.Provider>;
};

export default OrderProvider;
