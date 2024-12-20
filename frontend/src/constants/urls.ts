const baseUrl = 'http://localhost:3200'
const AccessTokenAuth = ''
const urlBuilder = {
  usersUrl: {
    // moviesUserList: (page: number) => baseUrl + '/discover/movie?page=' + page,
    // movieUrlById: (id: string | number) => baseUrl + '/movie/' + id,
    // genresUrlList: () => baseUrl + '/genre/movie/list',
    // getMovieWithGenres: (genreId: string, page: string) =>
    //   baseUrl + `/discover/movie?with_genres=${genreId}&page=${page}`,
    // getTrailer: (movie_id: number) => baseUrl + `/movie/${movie_id}/videos`,
  },
}

export { AccessTokenAuth, baseUrl, urlBuilder }
