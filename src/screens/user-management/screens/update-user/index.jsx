import { Link, useNavigate } from "react-router-dom";

import { Container, Header } from "@/components";
import { Button } from "@/components/ui";

import BackspaceIcon from "~icons/custom/backspace";

const UpdateUser = () => {
  const navigate = useNavigate();
  return (
    <Container className="justify-start h-full pt-40 pb-12">
      <Header
        title="Update User"
        actionButton={
          <Button
            variant="ghost"
            className="w-auto px-3 bg-secondary-500 hover:bg-secondary-700 text-primary-50 hover:text-primary-50 gap-2"
            onClick={() => navigate("/user-management")}
          >
            <span>Create & Save</span>
          </Button>
        }
      />
    </Container>
  );
};

export default UpdateUser;
