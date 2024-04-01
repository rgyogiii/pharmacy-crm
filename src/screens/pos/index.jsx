import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Container, Header } from "@/components";
import { Button, Separator } from "@/components/ui";

import BackspaceIcon from "~icons/custom/backspace";
import Product from "./product";
import Purchase from "./purchase";

const POS = () => {
  const navigate = useNavigate();
  const [showOrder, setShowOrder] = useState(false);

  return (
    <div className="pt-16 pb-12 h-full w-full px-8 flex gap-6">
      <Product showOrder={showOrder} setShowOrder={setShowOrder} />
      {showOrder && <Purchase setShowOrder={setShowOrder} />}
    </div>
  );
};

export default POS;
