import Button from 'react-bootstrap/Button'
import playBtn from '../../../../assets/play-btn.svg'
import editBtn from '../../../../assets/pencil.svg'
import deleteBtn from '../../../../assets/trash.svg'
import { useContext } from 'react'

import { PostContext } from '../../../../contexts/PostContext'

const ActionButtons = ({url, _id}) => {
  const {
    findPost,
    deletePost,
    setShowUpdatePostModal,
    setShowToast
  } = useContext(PostContext)

  
  const onUpdate = _id => {
    findPost(_id)
    setShowUpdatePostModal(true)
  }

  const onDelete = async () => {
    const {success, message} = await deletePost(_id)
    setShowToast({show: true, message, type: success ? 'success' : 'danger'})
  }


  return (
    <>
      <Button className='post-button' href={url} target='_blank'>
        <img src={playBtn} alt='Play' width='32' height='32'/>
      </Button>
      <Button className='post-button' onClick={onUpdate.bind(this, _id)}>
        <img src={editBtn} alt='Edit' width='24' height='24'/>
      </Button>
      <Button className='post-button' onClick={onDelete}>
        <img src={deleteBtn} alt='Delete' width='24' height='24'/>
      </Button>
    </>
  )
}

export default ActionButtons
