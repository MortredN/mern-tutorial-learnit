import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SinglePost = ({post: {_id, status, title, description, url}}) => {
  const color = status === 'COMPLETED' ? 'success' : (status === 'IN PROGRESS' ? 'warning' : 'danger')

  return (
    <Card className='shadow' border={color}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className='post-title'>{title}</p>
              <Badge pill bg={color}>{status}</Badge>
            </Col>
            <Col className='text-end'>
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SinglePost
