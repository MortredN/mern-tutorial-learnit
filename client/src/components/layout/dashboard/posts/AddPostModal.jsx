import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext, useState } from 'react'

import { PostContext } from '../../../../contexts/PostContext'

const AddPostModal = () => {
  const {
    addPost,
    showAddPostModal,
    setShowAddPostModal,
    setShowToast
  } = useContext(PostContext)

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN'
  })

  const {title, description, url} = newPost


  const closeDialog = () => {
    setNewPost({title: '', description: '', url: '', status: 'TO LEARN'})
    setShowAddPostModal(false)
  }

  const onChangeNewPost = event => {
    setNewPost({...newPost, [event.target.name]: event.target.value})
  }

  const onSubmit = async event => {
    event.preventDefault()

    const {success, message} = await addPost(newPost)
    setShowToast({show: true, message, type: success ? 'success' : 'danger'})

    if (success)
      closeDialog()
  }


  return (
    <Modal show={showAddPostModal} onHide={closeDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>What to learn?</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}> 
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={onChangeNewPost}
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
              onChange={onChangeNewPost} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='URL'
              name='url'
              value={url}
              onChange={onChangeNewPost} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
          <Button variant='primary' type='submit'>LearnIt!</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddPostModal
