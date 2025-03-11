/* eslint-disable camelcase */
const mapSongDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapSongDbToSongs = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

module.exports = { mapSongDBToModel, mapSongDbToSongs };
