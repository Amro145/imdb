import User from "@/lib/models/user.model";
import { connect } from "@/lib/mongodb/mongoose";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const PUT = async (req) => {
  const user = await currentUser();
  const client = await clerkClient();

  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userMongoId = user.publicMetadata?.userMongoId;

  if (!userMongoId) {
    console.error(`User ${user.id} has no userMongoId in publicMetadata`);
    return new Response(JSON.stringify({ message: "User profile not linked. Please sign in again." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }


  try {
    await connect();
    const data = await req.json();

    if (!data.movieId) {
      return new Response(JSON.stringify({ message: "Movie ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let updatedUser;
    const existingUser = await User.findOne({ _id: userMongoId });

    if (!existingUser) {
      console.error(`No user found in MongoDB for ID: ${userMongoId}`);
      return new Response(
        JSON.stringify({ message: "User profile not found in database." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }


    const movieIdStr = String(data.movieId);

    if (
      existingUser.favs.some(
        (fav) => String(fav.movieId) === movieIdStr
      )
    ) {
      updatedUser = await User.findByIdAndUpdate(
        userMongoId,
        { $pull: { favs: { movieId: movieIdStr } } },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userMongoId,
        {
          $addToSet: {
            favs: {
              movieId: movieIdStr,
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
      updatedUser?.favs?.map((fav) => String(fav.movieId)) || [];
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { ...user.publicMetadata, favs: updatedFavs },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error adding/removing favs to the user:", error);
    return new Response(JSON.stringify({ message: "Error updating favourites" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

