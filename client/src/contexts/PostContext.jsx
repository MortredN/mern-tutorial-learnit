import { createContext, useReducer, useState } from 'react'
import axios from 'axios'

import { postReducer } from '../reducers/postReducer'
import { API_URL, POSTS_LOADED_FAILED, POSTS_LOADED_SUCCESS, ADD_POST, UPDATE_POST, DELETE_POST, FIND_POST } from './_constants'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true
  })

  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  })

  
  const getPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`)
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: {posts: response.data.posts}
        })
      }
    }
    catch (error) {
      dispatch({
        type: POSTS_LOADED_FAILED
      })
      if(error.response.data)
        return error.response.data
      else
        return {success: false, message: error.message}
    }
  }

  const addPost = async newPost => {
    try {
      const response = await axios.post(`${API_URL}/posts`, newPost)
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: {post: response.data.post}
        })
        return response.data
      }
    }
    catch (error) {
      if(error.response.data)
        return error.response.data
      else
        return {success: false, message: error.message}
    }
  }

  const findPost = _id => {
    const post = postState.posts.find(post => post._id === _id)
    dispatch({
      type: FIND_POST,
      payload: {post}
    })
    return post
  }

  const updatePost = async updatedPost => {
    try {
      const response = await axios.put(`${API_URL}/posts/${updatedPost._id}`, updatedPost)
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: {post: updatedPost}
        })
        return response.data
      }
    }
    catch (error) {
      if(error.response.data)
        return error.response.data
      else
        return {success: false, message: error.message}
    }
  }

  const deletePost = async _id => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${_id}`)
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: {_id}
        })
        return response.data
      }
    }
    catch (error) {
      if(error.response.data)
        return error.response.data
      else
        return {success: false, message: error.message}
    }
  }


  const postContextData = {
    postState,
    getPosts,
    addPost,
    findPost,
    updatePost,
    deletePost,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showToast,
    setShowToast
  }

  return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>
}

export default PostContextProvider
