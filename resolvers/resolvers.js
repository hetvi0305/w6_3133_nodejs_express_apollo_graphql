import MovieModel from "../models/movie.js";

const movieResolvers = {
    Query: {
        // a) Get all movies
        getAllMovies: async () => {
        return await MovieModel.find();
        },

        // b) Get movie by ID
        getMovieById: async (_, { id }) => {
        return await MovieModel.findById(id);
        },

        // c) Get movies by Director name using static methods
        getMoviesByDirector: async (_, { director_name }) => {
        return await MovieModel.findByDirector(director_name);
        },
    },

    Mutation: {
        // a) Insert new movie
        insertMovie: async (_, { input }) => {
        const movie = new MovieModel(input);
        return await movie.save();
        },

        // b) Update movie
        updateMovie: async (_, { id, input }) => {
        const updatedMovie = await MovieModel.findByIdAndUpdate(
            id,
            { $set: input },
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            throw new Error("Movie not found");
        }

        return updatedMovie;
        },

        // c) Delete movie by ID
        deleteMovieById: async (_, { id }) => {
        const deleted = await MovieModel.findByIdAndDelete(id);
        return !!deleted;
        },
    },

    // Map MongoDB _id -> GraphQL id
    Movie: {
        id: (parent) => parent._id.toString(),
    },
};

export default movieResolvers;