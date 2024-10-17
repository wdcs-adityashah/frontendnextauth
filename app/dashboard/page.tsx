import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

const Dashboard = async (): Promise<JSX.Element> => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }
  
  let user = session.user;
  let firstName = '';
  let lastName = '';

  // Fallback to email-based name extraction if name is not available
  if (user.name) {
    const nameArray = user.name.split(' ');
    firstName = nameArray[0].charAt(0);
    lastName = nameArray[1] ? nameArray[1].charAt(0) : '';
  } else if (user.email) {
    // Fallback to using the part before '@' from the email as the first name
    const emailName = user.email.split('@')[0];
    firstName = emailName.charAt(0).toUpperCase(); // Use first letter of email as fallback
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-green-400 border p-4 mb-7">
        Welcome, {firstName}{lastName}!
      </h1>
      {/* Uncomment this section if user images are available */}
      {/* {user?.image && (
        <Image
          src={user?.image}
          alt={user?.name || 'User Image'}
          width={50}
          height={50}
          className="rounded-full"
        />
      )} */}
      <p className="text-gray-600">You are logged in with {user.email}</p>
    </div>
  );
};

export default Dashboard;
