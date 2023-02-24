
import React, {useState, useEffect} from "react"
import {useRouter} from "next/error"
import {Confirm, Button, Gri, router, Grid} from "semantic-ui-react"
import Error from 'next/error'

const task = ()=>{
    const [Confirm, setConfirm] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const {push, query} = useRouter()

    const deleteTask = async ()=>{
        const {id} = query
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            console.log(error)
        }
    }

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)

    return (
        <Grid 
            centered
            verticalAlign="middle"
            columns="1"
            style={{height: "80vh"}}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Card centered>
                        <Card.Head>{task.title}</Card.Head>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}

export async function getServerSideProps({query: {id}}){
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`)
    if(res.status === 200){
        const task = await res.json()
        return {
            props:{
                task,
            }
        }
    }

    return {
        props: {
            error:{
                statusCode: res.status,
                statusText: "Invalid ID"
            }
        }
    }
}

