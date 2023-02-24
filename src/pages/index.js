
import {Button, Card, Container, Grid} from 'semantic-ui-react'
import Link from 'next/Link'
import {router} from 'next/router'

export default function Home({tasks = []}) {

  if(tasks.length === 0 ){
    return (
      <Grid centered verticalAlign='middle' column="1" style={{heigth: "80vh"}}>
        <Grid.Row>
          <Grid.Column>
            <h1>They are no task present. Please, create a new one</h1>
            <div>
              <Button primary onClick={()=>router.push("/tasks/new")}>
                Create task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks && tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>
                <Link href={`/tasks/${task._id}`}>
                  {task.title}
                </Link>
              </Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button 
                color='orange' 
                onClick={()=> router.push(`/tasks/${task._id}`)}
              >
                View
              </Button>
              <Button 
                color='blue' 
                onClick={()=> router.push(`/tasks/${task._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

export async function getServerSideProps(){
  const response = await fetch("http://localhost:3000/api/tasks")
  const tasks = await response.json()

  return {
    props : {
      tasks,

    }
  }

}
