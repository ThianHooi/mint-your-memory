import { NextPage } from "next";
import MainView from "../layouts/MainView";
import CreateContract from "../modules/Create/components/CreateContract";

const Create: NextPage = () => {
  return (
    <MainView>
      <CreateContract />
    </MainView>
  );
};

export default Create;
