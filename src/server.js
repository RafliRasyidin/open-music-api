require('dotenv').config();
const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');
const albums = require('./api/albums');
const AlbumService = require('./services/postgres/AlbumService');
const AlbumHandler = require('./validator/albums');

const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongHandler = require('./validator/songs');

const init = async () => {
  const songsService = new SongsService();
  const albumService = new AlbumService(songsService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumHandler,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongHandler,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response.isBoom) {
      console.error('Request Error: ', response);
    }

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
