// import Header from "@/components/block/Header";

import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
const page = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="flex justify-center  flex-grow h-screen align-middle items-center ">
        <div className=" bg-cover   w-full h-full max-md:hidden"></div>
        <div className=" w-full h-full flex flex-col align-middle justify-center items-center">
          <div className="text-center flex flex-col gap-4 py-6 px-6 border rounded-md">
            <h1 className="text-4xl">
              portfolio<span className="text-orange-700">forge</span>
            </h1>
            <h5 className=" text-xl">Create Account with your github</h5>
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <Button type="submit">
                Sign In <GitHubLogoIcon />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
