import { signOut } from "@/auth";
// import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="">
      <div className="flex justify-center  flex-grow h-screen align-middle items-center ">
        <div className=" bg-cover  bg-[url('../public/illustrations/Team.png')] w-full h-full max-md:hidden"></div>
        <div className=" w-full h-full flex flex-col align-middle justify-center items-center">
          <div className="text-center flex flex-col gap-4 ">
            <h1 className="text-3xl text-center ">
              Talent<span className="text-green-400">Track</span>
            </h1>
            <p className="text-sm text-center text-gray-500">
              Sign out with your credentials
            </p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant={"default"} type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
