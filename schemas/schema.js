import { gql } from "graphql-tag";

const movieSchema = gql`
    type Movie {
        id: ID!
        name: String!
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Float!
    }

    type Query {
        # a) Get all movies
        getAllMovies: [Movie!]!

        # b) Get movie by ID
        getMovieById(id: ID!): Movie

        # c) Get movies by Director name (uses static method in resolver)
        getMoviesByDirector(director_name: String!): [Movie!]!
    }

    input MovieInput {
        name: String!
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Float!
    }

    input UpdateMovieInput {
        name: String
        director_name: String
        production_house: String
        release_date: String
        rating: Float
    }

    type Mutation {
        # a) Insert new movie
        insertMovie(input: MovieInput!): Movie!

        # b) Update movie
        updateMovie(id: ID!, input: UpdateMovieInput!): Movie!

        # c) Delete movie by ID
        deleteMovieById(id: ID!): Boolean!
    }
`;

export default movieSchema;