import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
	return (
		<Row className='mt-5' style={{ marginRight: 0 }}>
			<Col className='text-center'>
				<Button
					variant='primary'
					href='https://www.youtube.com/watch?v=rgFd17fyM4A'
					size='lg'
				>
					A MERN web app created by following this tutorial
				</Button>
			</Col>
		</Row>
	)
}

export default About
