import axios from "axios";
import {
  GET_ALBUMS_LOADING,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILED,
  CREATE_ALBUM_LOADING,
  CREATE_ALBUM_SUCCESS,
  CREATE_ALBUM_FAILED,
} from "./types";

/**
 * getAlbums
 */
const getAlbumsLoading = () => ({
  type: GET_ALBUMS_LOADING,
});

const getAlbumsSuccess = data => ({
  type: GET_ALBUMS_SUCCESS,
  data,
});

const getAlbumsFailed = data => ({
  type: GET_ALBUMS_FAILED,
  data,
});

export const getAlbums = () => async dispatch => {
  dispatch(getAlbumsLoading());
  try {
    const response = await axios.get("album-order");
    const { data } = response;

    dispatch(getAlbumsSuccess(data));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(getAlbumsFailed(message));
  }
};

/**
 * createAlbum
 */
const createAlbumLoading = uploadedPercent => ({
  type: CREATE_ALBUM_LOADING,
  data: uploadedPercent,
});

const createAlbumSuccess = () => ({
  type: CREATE_ALBUM_SUCCESS,
});

const createAlbumFailed = errorMessage => ({
  type: CREATE_ALBUM_FAILED,
  data: errorMessage,
});

export const createAlbum = photos => async dispatch => {
  dispatch(createAlbumLoading(0));

  const formData = new FormData();

  photos.forEach(photo => {
    formData.append(`photos[]`, {
      uri: photo.node.image.uri,
      type: photo.node.type,
      name: "photo", // arbitary name
    });
  });

  try {
    const config = {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
        dispatch(createAlbumLoading(percentCompleted));
      },
    };

    await axios.post("album-order", formData, config);

    dispatch(createAlbumSuccess());
  } catch (error) {
    const { /* errors, */ message } = error.response.data;
    dispatch(createAlbumFailed(message));
  }
};
