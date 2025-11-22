import axiosClient from '../utils/axiosClient';

function handleError(error) {
  return {
    ok: false,
    status: error.response?.status,
    message: error.response?.data?.message || error.response?.data?.error || error.message,
    raw: error
  };
}

export const useApiClient = () => {
  const get = async (url, params = {}) => {
    try {
      const res = await axiosClient.get(url, { params });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const post = async (url, body = {}, config = {}) => {
    try {
      const res = await axiosClient.post(url, body, config);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const put = async (url, body = {}, config = {}) => {
    try {
      const res = await axiosClient.put(url, body, config);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const del = async (url, params = {}) => {
    try {
      const res = await axiosClient.delete(url, { params });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  };

  return { get, post, put, delete: del };
};
