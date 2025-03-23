// import ProfileUpdatePage from "@/app/profile/_components/ProfileUpdatePage";
import { auth } from "@/auth";
import Header from "@/components/ui/Header";

export default async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) return null;

  return (
    <section className="min-h-screen flex items-center flex-col align-middle justify-center">
      <Header />
      <h1 className="  text-2xl text-center"> Update Profile</h1>

      {/* <ProfileUpdatePage email={session.user.email} /> */}
    </section>
  );
}
