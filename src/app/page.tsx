import { redirect } from "next/navigation";
import tokenServer from "@/utils/serverToken";
import Home from "./Homepage";

const page = async () => {
  // const token = await tokenServer.get();

  // if (token && !(await tokenServer.isExpired())) {
  //   const decoded = await tokenServer.decode();

  //   if (decoded?.role === "organization") {
  //     redirect("/org-dashboard");
  //   } else {
  //     redirect("/dashboard");
  //   }
  // }

  return <Home />;
};

export default page;
