import { ipcMain } from "electron";

import {
  Customer,
  Order,
  Permission,
  Physician,
  Product,
  User,
  Sale,
  ProductBatch,
} from "./models";
import moment from "moment";

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

    if (password !== accounts[0].password) {
      throw new Error("Incorrect email or password");
    }

    return JSON.stringify({ data: accounts[0], error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("user/all", async (event, args) => {
  try {
    const accounts = await User.find({}).sort({ createdAt: -1 });

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
        { permission: "pos", allowed: true },
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

    const result = await User.findByIdAndUpdate(
      { _id: account._id },
      { active },
      { new: true }
    );

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

    const result = await User.findByIdAndUpdate(
      { _id: accounts._id },
      { ...data },
      { new: true }
    );

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

    const formatted = result.type
      .filter((a) => a.allowed)
      .map((b) => b.permission);

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
    if (!_id || !data) {
      throw new Error("Product ID and data is required");
    }

    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("Product not found");
    }

    const result = await Product.findByIdAndUpdate(
      { _id: product._id },
      { ...data },
      { new: true }
    );

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

    const result = await Product.findByIdAndUpdate(
      { _id: product._id },
      { active },
      { new: true }
    );

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/all", async (event, args) => {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 });

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

//products batch
ipcMain.handle("product/batch/create", async (event, { _id, data }) => {
  try {
    if (!_id || !data) {
      throw new Error("Product ID and batch data is required");
    }

    const result = await new ProductBatch({
      product: _id,
      active: data?.active ?? true,
      ...data,
    }).save();

    if (!result) {
      throw new Error("Failed to create product batch");
    }

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/batch/all", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Product Batch id is required");
    }
    const productBatch = await ProductBatch.find({
      product: _id,
    });

    if (!productBatch) {
      throw new Error("Product Batch not found");
    }

    return JSON.stringify({ data: productBatch, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/batch/set-batch", async (event, { _id, product }) => {
  try {
    if (!_id) {
      throw new Error("Product Batch id is required");
    }

    const batches = await ProductBatch.find({
      product,
    });

    batches.forEach(async (item) => {
      try {
        await ProductBatch.findByIdAndUpdate(
          { _id: item._id },
          { active: _id === item._id.toString() },
          { new: true }
        );
      } catch (error) {
        console.error("Error updating product batch:", error);
      }
    });

    const batch = await ProductBatch.findById({ _id });

    const result = await Product.findByIdAndUpdate(
      { _id: product },
      {
        expiryDate: batch.expiryDate,
        price: batch.price,
        stock: batch.stock,
        location: batch.location,
      },
      { new: true }
    );

    if (!result) {
      throw new Error("Failed to update product batch");
    }

    return JSON.stringify({ data: batches, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/batch/get", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Product Batch id is required");
    }

    const productBatch = await ProductBatch.findById(_id);

    if (!productBatch) {
      throw new Error("Product Batch not found or multiple products exist");
    }

    return JSON.stringify({ data: productBatch, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/batch/remove", async (event, { _id }) => {
  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const productBatch = await ProductBatch.findById(_id);

    if (!productBatch) {
      throw new Error(
        "Product Batch not found or multiple products Batch exist"
      );
    }

    const result = await ProductBatch.deleteOne({ _id: productBatch._id });

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

ipcMain.handle("product/batch/update", async (event, { _id, data }) => {
  try {
    if (!_id || !data) {
      throw new Error("Product ID and data is required");
    }

    const productBatch = await ProductBatch.findById(_id);

    if (!productBatch) {
      throw new Error("Product Batch not found");
    }

    const result = await ProductBatch.findByIdAndUpdate(
      { _id: productBatch._id },
      { ...data },
      { new: true }
    );

    if (productBatch.active) {
      const product = await Product.findByIdAndUpdate(
        { _id: productBatch.product },
        {
          expiryDate: data.expiryDate,
          price: data.price,
          stock: data.stock,
          location: data.location,
        },
        { new: true }
      );
    }

    return JSON.stringify({ data: result, error: null });
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

    const result = await Customer.findByIdAndUpdate(
      { _id: customer._id },
      { ...data },
      { new: true }
    );

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
    return JSON.stringify({ data: physician, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//order
ipcMain.handle("order/create", async (event, args) => {
  try {
    if (!args) {
      throw new Error("Missing required fields");
    }

    const { customer, orders, physician } = args;

    const data = orders.map((item) => ({
      product: item._id,
      item: item.product,
      price: item.price,
      quantity: item.quantity,
    }));

    data.forEach(async (item) => {
      try {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      } catch (error) {
        console.error("Error updating product:", error);
      }
    });

    const result = await new Order({
      customer,
      orders: data,
      physician,
    }).save();

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//sales
ipcMain.handle("sales/create", async (event, args) => {
  try {
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

ipcMain.handle("sales/all", async (event, args) => {
  try {
    const sales = await Sale.find({}).populate("order").exec();

    const result = await Promise.all(
      sales.map(async (item) => {
        const quantity = item.order.orders.reduce((total, order) => {
          return total + order.quantity;
        }, 0);

        return {
          id: item.order._id,
          quantity,
          items: item.items,
          total: item.total,
          date: moment(item.dateSold).format("MMM D, YYYY h:mm A"),
          customer: item.order.customer,
          physician: item.order.physician,
        };
      })
    );

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});

//stats
const handleResultDiff = (prev, now) => {
  if (prev > now) {
    return "decrease";
  } else if (prev < now) {
    return "increase";
  } else if (prev === now) {
    return "same";
  }
};

const handleMonthlyData = async () => {
  const currentMonth = moment().format("MMM");
  const prevMonth = moment().subtract(1, "month").format("MMM");

  const sales = await Sale.find({}).populate("order").exec();

  const salesCurrentMonth = sales.filter(
    (item) => moment(item.dateSold).format("MMM") === currentMonth
  );
  const salesPrevMonth = sales.filter(
    (item) => moment(item.dateSold).format("MMM") === prevMonth
  );

  const products = await Product.find({});
  const customers = await Customer.find({});

  const productQuantityCurrentMonth = await Promise.all(
    salesCurrentMonth.map(async (item) => {
      return item.order.orders.reduce((total, order) => {
        return total + order.quantity;
      }, 0);
    })
  );

  const productQuantityPrevMonth = await Promise.all(
    salesPrevMonth.map(async (item) => {
      return item.order.orders.reduce((total, order) => {
        return total + order.quantity;
      }, 0);
    })
  );

  const stocks = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);

  const revenuePrev = salesPrevMonth.reduce((total, order) => {
    return total + order.total;
  }, 0);

  const revenueNow = salesCurrentMonth.reduce((total, order) => {
    return total + order.total;
  }, 0);

  const productQuantityPrev = productQuantityPrevMonth.reduce(
    (total, product) => {
      return total + product;
    },
    0
  );

  const productQuantityNow = productQuantityCurrentMonth.reduce(
    (total, product) => {
      return total + product;
    },
    0
  );

  const customerPrev = customers.filter(
    (item) => moment(item.createdAt).format("MMM") === prevMonth
  ).length;
  const customerNow = customers.filter(
    (item) => moment(item.createdAt).format("MMM") === currentMonth
  ).length;

  const result = {
    customers: {
      value: customerNow,
      type:
        customerNow !== 0 ? handleResultDiff(customerPrev, customerNow) : null,
    },
    product: {
      value: productQuantityNow,
      type:
        customerNow !== 0
          ? handleResultDiff(productQuantityPrev, productQuantityNow)
          : null,
    },
    revenue: {
      value: revenueNow,
      type:
        customerNow !== 0 ? handleResultDiff(revenuePrev, revenueNow) : null,
    },
    stocks: { value: stocks },
  };

  return result;
};

const handleDailyData = async () => {
  const currentDate = moment().format("YYYY-MM-DD");
  const prevDate = moment().subtract(1, "day").format("YYYY-MM-DD");

  const sales = await Sale.find({}).populate("order").exec();

  const salesCurrentDay = sales.filter(
    (item) => moment(item.dateSold).format("YYYY-MM-DD") === currentDate
  );
  const salesPrevDay = sales.filter(
    (item) => moment(item.dateSold).format("YYYY-MM-DD") === prevDate
  );

  const products = await Product.find({});
  const customers = await Customer.find({});

  const productQuantityCurrentDay = await Promise.all(
    salesCurrentDay.map(async (item) => {
      return item.order.orders.reduce((total, order) => {
        return total + order.quantity;
      }, 0);
    })
  );

  const productQuantityPrevDay = await Promise.all(
    salesPrevDay.map(async (item) => {
      return item.order.orders.reduce((total, order) => {
        return total + order.quantity;
      }, 0);
    })
  );

  const stocks = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);

  const revenuePrev = salesPrevDay.reduce((total, order) => {
    return total + order.total;
  }, 0);

  const revenueNow = salesCurrentDay.reduce((total, order) => {
    return total + order.total;
  }, 0);

  const productQuantityPrev = productQuantityPrevDay.reduce(
    (total, product) => {
      return total + product;
    },
    0
  );

  const productQuantityNow = productQuantityCurrentDay.reduce(
    (total, product) => {
      return total + product;
    },
    0
  );

  const customerPrev = customers.filter(
    (item) => moment(item.createdAt).format("YYYY-MM-DD") === prevDate
  ).length;
  const customerNow = customers.filter(
    (item) => moment(item.createdAt).format("YYYY-MM-DD") === currentDate
  ).length;

  const result = {
    customers: {
      value: customerNow,
      type:
        customerNow !== 0 ? handleResultDiff(customerPrev, customerNow) : null,
    },
    product: {
      value: productQuantityNow,
      type:
        customerNow !== 0
          ? handleResultDiff(productQuantityPrev, productQuantityNow)
          : null,
    },
    revenue: {
      value: revenueNow,
      type:
        customerNow !== 0 ? handleResultDiff(revenuePrev, revenueNow) : null,
    },
    stocks: { value: stocks },
  };

  return result;
};

ipcMain.handle("stats", async (event, { filter = "daily" }) => {
  try {
    const result =
      filter === "daily" ? await handleDailyData() : await handleMonthlyData();

    return JSON.stringify({ data: result, error: null });
  } catch (err) {
    console.error(err);
    return JSON.stringify({ data: null, error: err.message });
  }
});
