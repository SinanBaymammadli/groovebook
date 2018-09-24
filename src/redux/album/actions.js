import axios from "axios";
import {
  GET_ALBUMS_LOADING,
  GET_ALBUMS_SUCCESS,
  GET_ALBUMS_FAILED,
  CREATE_ALBUM_LOADING,
  CREATE_ALBUM_SUCCESS,
  CREATE_ALBUM_FAILED,
  UPDATE_ALBUM_LOADING,
  UPDATE_ALBUM_SUCCESS,
  UPDATE_ALBUM_FAILED,
  GET_ALBUM_SETTINGS_LOADING,
  GET_ALBUM_SETTINGS_SUCCESS,
  GET_ALBUM_SETTINGS_FAILED,
  PRINT_ALBUM_LOADING,
  PRINT_ALBUM_SUCCESS,
  PRINT_ALBUM_FAILED,
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

/**
 * updateAlbum
 */
const updateAlbumLoading = uploadedPercent => ({
  type: UPDATE_ALBUM_LOADING,
  data: uploadedPercent,
});

const updateAlbumSuccess = () => ({
  type: UPDATE_ALBUM_SUCCESS,
});

const updateAlbumFailed = errorMessage => ({
  type: UPDATE_ALBUM_FAILED,
  data: errorMessage,
});

export const updateAlbum = (photos, albumId) => async dispatch => {
  dispatch(updateAlbumLoading(0));

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
        dispatch(updateAlbumLoading(percentCompleted));
      },
    };

    await axios.post(`album-order/add-photos/${albumId}`, formData, config);

    dispatch(updateAlbumSuccess());
  } catch (error) {
    console.log(error.response);
    const { /* errors, */ message } = error.response.data;
    dispatch(updateAlbumFailed(message));
  }
};

/**
 * getAlbumSettings
 */
const getAlbumSettingsLoading = () => ({
  type: GET_ALBUM_SETTINGS_LOADING,
});

const getAlbumSettingsSuccess = data => ({
  type: GET_ALBUM_SETTINGS_SUCCESS,
  data,
});

const getAlbumSettingsFailed = data => ({
  type: GET_ALBUM_SETTINGS_FAILED,
  data,
});

export const getAlbumSettings = () => async dispatch => {
  dispatch(getAlbumSettingsLoading());
  try {
    const response = await axios.get("album/settings");
    const { data } = response;

    dispatch(getAlbumSettingsSuccess(data));
  } catch (error) {
    console.log(error.response.data);
    const { message } = error.response.data;
    dispatch(getAlbumSettingsFailed(message));
  }
};

/**
 * printAlbum
 */
const printAlbumLoading = () => ({
  type: PRINT_ALBUM_LOADING,
});

const printAlbumSuccess = () => ({
  type: PRINT_ALBUM_SUCCESS,
});

const printAlbumFailed = data => ({
  type: PRINT_ALBUM_FAILED,
  data,
});

export const printAlbum = albumId => async dispatch => {
  dispatch(printAlbumLoading());
  try {
    await axios.patch(`album-order/${albumId}`);

    dispatch(printAlbumSuccess());
  } catch (error) {
    console.log(error.response.data);
    const { message } = error.response.data;
    dispatch(printAlbumFailed(message));
  }
};
