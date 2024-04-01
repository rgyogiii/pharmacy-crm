import { useNavigate } from "react-router-dom";

import Card from "./components/Card";
import { Container } from "@/components";
import { useAuth } from "@/hooks";

const menus = [
  { name: "POS", link: "/pos", logo: "/resources/illustrations/payment.png", lock: false },
  { name: "Inventory", link: "/inventory", logo: "/resources/illustrations/stocks.png", lock: false },
  // { name: "Sales", link: "/sales", logo: "/resources/illustrations/charts.png", lock: false },
  // { name: "Receipt", link: "/receipt", logo: "/resources/illustrations/receipt.png", lock: false },
  { name: "User Management", link: "/user-management", logo: "/resources/illustrations/users.png", lock: false },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { permissions } = useAuth();

  console.log({ permissions: menus.filter((menu) => permissions.includes(menu.link.substring(1))) });
  return (
    <Container>
      <div className="grid grid-cols-3 gap-8">
        {menus
          .filter((menu) => permissions.includes(menu.link.substring(1)))
          .map((menu, i) => (
            <Card key={i} {...menu} onClick={() => navigate(menu.link)} />
          ))}
      </div>
    </Container>
  );
};

export default Dashboard;
