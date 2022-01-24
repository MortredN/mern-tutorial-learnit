import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'

import { AuthContext } from '../../../contexts/AuthContext'
import { PostContext } from '../../../contexts/PostContext'
import SinglePost from './posts/SinglePost'
import AddPostModal from './posts/AddPostModal'
import UpdatePostModal from './posts/UpdatePostModal'
import addBtn from '../../../assets/plus-circle-fill.svg'

const Dashboard = () => {
  const {
    postState: {post, posts, postsLoading},
    getPosts,
    setShowAddPostModal,
    showToast,
    setShowToast
  } = useContext(PostContext)

  const {authState: {user: {username}}} = useContext(AuthContext)


  useEffect(() => getPosts(), [])


  let body = null

  if (postsLoading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  }
  else if (posts.length === 0) {
    body = (
      <Card className='text-center mx-5 my-5'>
        <Card.Header as='h1'>Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to LearnIt</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn
          </Card.Text>
          <Button variant='primary' onClick={setShowAddPostModal.bind(this, true)}>LearnIt!</Button>
        </Card.Body>
      </Card>
    )
  }
  else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        <OverlayTrigger placement='left' overlay={<Tooltip>Add a skill to learn</Tooltip>}>
          <Button className='btn-floating' onClick={setShowAddPostModal.bind(this, true)}>
            <img src={addBtn} alt='Add' width='60' height='60' />
          </Button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post ? <UpdatePostModal /> : <></>} 

      <Toast
        show={showToast.show}
        style={{ position: 'fixed', top: '10%', right: '1em' }}
        bg={showToast.type ? 'success' : 'danger'}
        className='text-white'
        onClose={setShowToast.bind(this, {show: false, message: '', type: null})}
        delay={3000}
        animation={false}
        autohide
      >
        <Toast.Body>
          <strong>{showToast.message}</strong>
        </Toast.Body>
      </Toast>
    </>
  )
}

export default Dashboard
