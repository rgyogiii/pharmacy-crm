// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge, ipcMain } = require("electron");

const WINDOW_API = {
  greet: (message) => ipcRenderer.send("greet", message),
  GetVersion: () => ipcRenderer.invoke("get/clients"),
  SigninUser: (props) => ipcRenderer.invoke("user/sign-in", props),
  GetUsers: () => ipcRenderer.invoke("user/all"),
  CreateUser: (props) => ipcRenderer.invoke("user/create", props),
  SetUserRole: (props) => ipcRenderer.invoke("user/set-role", props),
  ActivateUser: (props) => ipcRenderer.invoke("user/activate", props),
  RemoveUser: (props) => ipcRenderer.invoke("user/remove", props),
  UserPermission: (props) => ipcRenderer.invoke("user/permission", props),
  UpdateUser: (props) => ipcRenderer.invoke("user/update", props),
  CreateProduct: (props) => ipcRenderer.invoke("product/create", props),
  RemoveProduct: (props) => ipcRenderer.invoke("product/remove", props),
  UpdateProduct: (props) => ipcRenderer.invoke("product/update", props),
  ActivateProduct: (props) => ipcRenderer.invoke("product/activate", props),
  GetAllProduct: (props) => ipcRenderer.invoke("product/all", props),
  GetProduct: (props) => ipcRenderer.invoke("product/get", props),
  CreateCustomer: (props) => ipcRenderer.invoke("customer/create", props),
  UpdateCustomer: (props) => ipcRenderer.invoke("customer/update", props),
  GetCustomer: (props) => ipcRenderer.invoke("customer/get", props),
  CreatePhysician: (props) => ipcRenderer.invoke("physician/create", props),
  GetAllPhysician: (props) => ipcRenderer.invoke("physician/all", props),
  CreateOrder: (props) => ipcRenderer.invoke("order/create", props),
  CreateSales: (props) => ipcRenderer.invoke("sales/create", props),
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
