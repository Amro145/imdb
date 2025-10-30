import User from "@/lib/models/user.model";
import { connect } from "@/lib/mongodb/mongoose";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const PUT = async (req) => {
  const user = await currentUser();
  const client = await clerkClient();
  const userMongoId = user?.publicMetadata?.userMongoId;

  if (!user || !userMongoId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connect();
    const data = await req.json();
  
    console.log("Data received in fav route:", data);
    let updatedUser;

    const existingUser = await User.findById(userMongoId);

    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "User profile not found in database." }),
        { status: 404 }
      );
    }

    if (
      existingUser.favs.some(
        (fav) => Number(fav.movieId) === Number(data.movieId)
      )
    ) {
      updatedUser = await User.findByIdAndUpdate(
        userMongoId,
        { $pull: { favs: { movieId: data.movieId } } },
        { new: true }
      );
    } else {
      console.log(typeof data.movieId);
      updatedUser = await User.findByIdAndUpdate(
        userMongoId,
        {
          $addToSet: {
            favs: {
              movieId: data.movieId,
              title: data.title || data.name,
              description: data.overview,
              dateReleased: data.release_date || data.first_air_date,
              rating: data.vote_average || data.vote_count,
              image: data.image || data.backdrop_path || data.poster_path,
            },
          },
        },
        { new: true }
      );
    }

    const updatedFavs =
      updatedUser?.favs?.map((fav) => Number(fav.movieId)) || [];
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { favs: updatedFavs },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error adding/removing favs to the user:", error);
    return new Response("Error adding/removing favs to the user", {
      status: 500,
    });
  }
};
