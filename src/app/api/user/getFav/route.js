import User from "@/lib/models/user.model";
import { connect } from "@/lib/mongodb/mongoose";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const PUT = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    if (!user) {
      return new Response({ message: "Unauthorized" }, { status: 401 });
    }
    const existingUser = await User.findById(user.publicMetadata.userMongoId);
    if (!existingUser) {
      return new Response({ message: "User not found" }, { status: 404 });
    }
    return new Response(JSON.stringify({ favs: existingUser.favs }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
