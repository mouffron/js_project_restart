'use strict';

const Boom = require('@hapi/boom');
const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {
    createMovie(movie){
        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie);
    }

    getAll() {
        const { Movie } = this.server.models();
        return Movie.query().select('id', 'title', 'description', 'releaseDate', 'director');
    }

    getMovieById(id) {
        const { Movie } = this.server.models();

        const movie = Movie.query().findById(id);

        return movie.select('title', 'description', 'releaseDate', 'director')
    }

    async deleteMovieById(id){
        const { Movie } = this.server.models();

        const movieToDelete = await Movie.query().findById(id);

        if (!movieToDelete) {

            throw Boom.notFound('Movie not found');
        }
        try {
            await Movie.query().deleteById(id);
        } catch (error){
            throw error;
        }
    }

    async updateMovieById(id, movieData){
        const { Movie } = this.server.models();

        const movieToUpdate = await Movie.query().findById(id);

        if (!movieToUpdate) {
            throw Boom.notFound('Movie not found');
        }
        try {
            if (movieData.title) {
                movieToUpdate.title = movieData.title;
            }
            if (movieData.description) {
                movieToUpdate.description = movieData.description;
            }
            if (movieData.releaseDate) {
                movieToUpdate.releaseDate = movieData.releaseDate;
            }
            if (movieData.director) {
                movieToUpdate.director = movieData.director;
            }

            await movieToUpdate.$query().patch();

            return movieToUpdate;
        } catch (error) {
            throw error;
        }
    }
}
