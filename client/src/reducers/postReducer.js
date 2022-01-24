import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAILED,
  ADD_POST,
  FIND_POST,
  UPDATE_POST,
  DELETE_POST
} from "../contexts/_constants"

export const postReducer = (state, action) => {
  const {type, payload} = action

  switch(type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload.posts,
        postsLoading: false
      }

    case POSTS_LOADED_FAILED:
      return {
        ...state,
        posts: [],
        postsLoading: false
      }

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload.post]
      }

    case FIND_POST:
      return {
        ...state,
        post: payload.post
      }
  

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => (post._id === payload.post._id) ? payload.post : post)
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload._id)
      }
  
    default:
      return state
  }
}
