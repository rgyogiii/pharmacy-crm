const filter = {
  searches: {
    column: "email",
  },
  role: {
    column: "role",
    title: "Role",
    options: [
      {
        value: "admin",
        label: "Admin",
      },
      {
        value: "pharmacist",
        label: "Pharmacist",
      },
      {
        value: "sales",
        label: "Sales",
      },
      {
        value: null,
        label: "Not Set",
      },
    ],
  },
};

export default filter;
