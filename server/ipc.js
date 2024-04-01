import { ipcMain } from "electron";

import { Customer, Order, Permission, Physician, Product, User, Sale } from "./models";

ipcMain.on("greet", async (event, args) => {
  return "Hi Hello Romar";
});
ipcMain.handle("get/clients", async (event, args) => {
  return "Hi Hello Romar";
});

//users
ipcMain.handle("user/sign-in", async (event, { email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Email and Password is required");
    }

    const accounts = await User.find({
      email: new RegExp("^" + email + "$", "i"),
    });

    if (accounts.length <= 0 || accounts.length > 1) {
      throw new Error("Account not found or multiple accounts exist");
    }

    if (accounts[0].role !== "admin" && !accounts[0].active) {
      throw new Error("Account is not yet active");
    }

    return JSON.stringify({ data: accounts[0], error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/all", async (event, args) => {
  try {
    const accounts = await User.find({});

    console.log({ accounts });
    return JSON.stringify({ data: accounts, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/create", async (event, { email, password }) => {
  try {
    const accounts = await User.find({
      email: new RegExp("^" + email + "$", "i"),
    });

    if (accounts.length > 0) {
      throw new Error("Account is already exists");
    }

    const result = await new User({ email, password }).save();

    if (!result) {
      throw new Error("Failed to create user account");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/set-role", async (event, { email, role }) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const accounts = await User.find({
      email: new RegExp("^" + email + "$", "i"),
    });

    if (accounts.length <= 0 || accounts.length > 1) {
      throw new Error("Account not found or multiple accounts exist");
    }

    const userPermission = {
      admin: [
        { permission: "pos", allowed: true },
        { permission: "inventory", allowed: true },
        { permission: "sales", allowed: true },
        { permission: "receipt", allowed: true },
        { permission: "user-management", allowed: true },
      ],
      pharmacist: [
        { permission: "pos", allowed: false },
        { permission: "inventory", allowed: true },
        { permission: "sales", allowed: false },
        { permission: "receipt", allowed: false },
        { permission: "user-management", allowed: false },
      ],
      sales: [
        { permission: "pos", allowed: true },
        { permission: "inventory", allowed: true },
        { permission: "sales", allowed: true },
        { permission: "receipt", allowed: true },
        { permission: "user-management", allowed: false },
      ],
    };

    const permissions = await new Permission({
      user: accounts[0]._id,
      type: userPermission[role],
    }).save();

    const result = await User.findByIdAndUpdate(
      { _id: accounts[0]._id },
      { role, permissions: permissions._id },
      { new: true }
    );

    if (!result) {
      throw new Error("Unable to set the account role");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/activate", async (event, { _id, active }) => {
  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const account = await User.findById(_id);

    if (!account) {
      throw new Error("Account not found or multiple accounts exist");
    }

    const result = await User.findByIdAndUpdate({ _id: account._id }, { active }, { new: true });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/remove", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const account = await User.findById(_id);

    if (!account) {
      throw new Error("Account not found or multiple accounts exist");
    }

    const result = await User.deleteOne({ _id: account._id });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/update", async (event, { _id, data }) => {
  try {
    if (!_id || !data) {
      throw new Error("Id and data is required");
    }

    const accounts = await User.findById(_id);

    if (!accounts) {
      throw new Error("Account not found or multiple accounts exist");
    }

    const result = await User.findByIdAndUpdate({ _id: accounts._id }, { ...data }, { new: true });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/permission", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const result = await Permission.findById(_id);

    if (!result) {
      throw new Error("Permission not found");
    }

    const formatted = result.type.filter((a) => a.allowed).map((b) => b.permission);
    console.log({ formatted });
    return JSON.stringify({ data: formatted, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//products
ipcMain.handle("product/create", async (event, args) => {
  try {
    const products = await Product.find({
      name: new RegExp("^" + args.name + "$", "i"),
    });

    if (products.length > 0) {
      throw new Error("Product is already exists");
    }

    const result = await new Product(args).save();

    if (!result) {
      throw new Error("Failed to create user product");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/remove", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("Product not found or multiple products exist");
    }

    const result = await Product.deleteOne({ _id: product._id });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/update", async (event, { _id, data }) => {
  try {
    console.log({ _id, data });
    if (!_id || !data) {
      throw new Error("Product ID and data is required");
    }

    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("Product not found");
    }

    const result = await Product.findByIdAndUpdate({ _id: product._id }, { ...data }, { new: true });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/activate", async (event, { _id, active }) => {
  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("Product not found");
    }

    const result = await Product.findByIdAndUpdate({ _id: product._id }, { active }, { new: true });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/all", async (event, args) => {
  try {
    const product = await Product.find({});
    console.log({ product });
    return JSON.stringify({ data: product, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/get", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Product id is required");
    }

    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("Product not found or multiple products exist");
    }

    return JSON.stringify({ data: product, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//customer
ipcMain.handle("customer/create", async (event, args) => {
  try {
    const result = await new Customer().save();

    if (!result) {
      throw new Error("Failed to create customer");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("customer/get", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Customer id is required");
    }

    const result = await Customer.findById(_id);

    if (!result) {
      throw new Error("Customer not found or multiple customer exist");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("customer/update", async (event, { _id, data }) => {
  try {
    if (!_id || !data) {
      throw new Error("Customer ID and data is required");
    }

    const customer = await Customer.findById(_id);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const result = await Customer.findByIdAndUpdate({ _id: customer._id }, { ...data }, { new: true });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//physician
ipcMain.handle("physician/create", async (event, args) => {
  try {
    const products = await Physician.find({
      idNumber: new RegExp("^" + args.idNumber + "$", "i"),
    });

    if (products.length > 0) {
      throw new Error("Physician is already exists");
    }

    const result = await new Physician(args).save();

    if (!result) {
      throw new Error("Failed to create physician");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("physician/all", async (event, args) => {
  try {
    const physician = await Physician.find({});
    console.log({ physician });
    return JSON.stringify({ data: physician, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//order
ipcMain.handle("order/create", async (event, { customer, orders, physician }) => {
  try {
    if (!customer || orders.length === 0 || !physician) {
      throw new Error("Missing required fields");
    }

    const data = orders.map((item) => ({
      product: item._id,
      item: item.product,
      price: item.price,
      quantity: item.quantity,
    }));

    data.forEach(async (item) => {
      try {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } }, { new: true });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    });

    const result = await new Order({ customer, orders: data, physician }).save();

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//sales
ipcMain.handle("sales/create", async (event, args) => {
  try {
    console.log({ args });
    if (!args) {
      throw new Error("Missing required fields");
    }

    const result = await new Sale(args).save();

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});
