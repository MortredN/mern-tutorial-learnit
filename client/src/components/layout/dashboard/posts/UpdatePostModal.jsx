import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext, useState, useEffect } from 'react'

import { PostContext } from '../../../../contexts/PostContext'

const UpdatePostModal = () => {
  const {
    postState: {post},
    updatePost,
    showUpdatePostModal,
    setShowUpdatePostModal,
    setShowToast
  } = useContext(PostContext)

  const [updatedPost, setUpdatedPost] = useState(post)
  useEffect(() => setUpdatedPost(post), [post])

  const {title, description, url, status} = updatedPost


  const closeDialog = () => {
    setShowUpdatePostModal(false)
    setUpdatedPost(post)
  }

  const onChangeUpdatedPost = event => {
    setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})
  }

  const onSubmit = async event => {
    event.preventDefault()

    const {success, message} = await updatePost(updatedPost)
    setShowToast({show: true, message, type: success ? 'success' : 'danger'})

    if (success)
      closeDialog()
  }


  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}> 
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={onChangeUpdatedPost}
              required
              aria-describedby='title-help' />
            <Form.Text id='title-help' muted>Required</Form.Text>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChangeUpdatedPost} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='URL'
              name='url'
              value={url}
              onChange={onChangeUpdatedPost} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Select
              value={status}
              name='status'
              onChange={onChangeUpdatedPost}>
              <option value='TO LEARN'>To Learn</option>
              <option value='IN PROGRESS'>In Progress</option>
              <option value='COMPLETED'>Completed</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
          <Button variant='primary' type='submit'>Update!</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UpdatePostModal
