const mongoose = require("mongoose");

// admin - super user
// pharmacist - medecine search or review
// sales - pos

const userSchema = new mongoose.Schema(
  {
    avatar: { type: String, default: null },
    username: { type: String, default: null },
    email: { type: String, default: null, required: true },
    password: { type: String, default: null, required: true },
    role: { type: String, enum: ["admin", "pharmacist", "sales"], default: null },
    active: { type: Boolean, default: false },
    permissions: { type: mongoose.Schema.Types.ObjectId, ref: "Permission", default: null },
  },
  {
    timestamps: true,
  }
);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    idType: { type: String, default: null },
    idNumber: { type: String, default: null },
    address: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    manufacturer: { type: String, required: true },
    expiryDate: { type: Date, default: null },
    price: { type: Number, default: 0 },
    isPrescriptionRequired: { type: Number, default: false },
    stock: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    orders: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        item: String,
        price: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
      },
    ],
    doctor: { type: String, default: null },
    hospital: { type: String, default: null },
    clinic: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const salesSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    totalItems: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    cash: { type: Number, required: true },
    change: { type: Number, default: null },
    promoCode: { type: Number, default: null },
    discount: { type: Number, default: 0, min: 0, max: 100 }, // Discount in percentage
    tax: { type: Number, default: 12, min: 0, max: 100 }, // Tax in percentage
    dateSold: { type: Date, default: Date.now },
    receipt: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const permissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: [
      {
        permission: { type: String, default: null },
        allowed: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
export const Product = mongoose.model("Product", productSchema);
export const Customer = mongoose.model("Customer", customerSchema);
export const Order = mongoose.model("Order", orderSchema);
export const Sale = mongoose.model("Sale", salesSchema);
export const Permission = mongoose.model("Permission", permissionSchema);
