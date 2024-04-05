import { useNavigate } from "react-router-dom";

import Card from "./components/Card";
import { Container, Header } from "@/components";
import { useAuth, useData } from "@/hooks";

import { useEffect } from "react";
import Stats from "./components/Stats";

const menus = [
  {
    name: "POS",
    link: "/pos",
    logo: "/resources/illustrations/payment.png",
    lock: false,
  },
  {
    name: "Inventory",
    link: "/inventory",
    logo: "/resources/illustrations/stocks.png",
    lock: false,
  },
  {
    name: "Sales",
    link: "/sales",
    logo: "/resources/illustrations/charts.png",
    lock: false,
  },
  // { name: "Receipt", link: "/receipt", logo: "/resources/illustrations/receipt.png", lock: false },
  {
    name: "User Management",
    link: "/user-management",
    logo: "/resources/illustrations/users.png",
    lock: false,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { permissions } = useAuth();
  const { products, stats, updateStats } = useData();
  // updateStats

  useEffect(() => {
    updateStats();
  }, []);

  return (
    <Container className="space-y-12">
      <Stats
        revenue={stats?.revenue.value ?? 0}
        product={stats?.product.value ?? 0}
        customers={stats?.customers.value ?? 0}
        stocks={stats?.stocks.value ?? 0}
        productIncrement={stats?.product.type}
        revenueIncrement={stats?.revenue.type}
        customerIncrement={stats?.customers.type}
      />

      <div className="grid grid-cols-4 gap-8 p-10">
        {menus
          .filter(
            (menu) =>
              permissions && permissions.includes(menu.link.substring(1))
          )
          .map((menu, i) => (
            <Card key={i} {...menu} onClick={() => navigate(menu.link)} />
          ))}
      </div>
    </Container>
  );
};

export default Dashboard;
