
import {Menu, Container, Button} from "semantic-ui-react"
import Link from "next/link"
import {useRouter} from "next/router"

export const NavBar = ()=>{
    const router = useRouter()
    return(
        <Menu inverted borderless style={{padding: ".3em", marginBottom: "20px"}} attached>
            <Container>
                <Menu.Item name="home">
                    <Link href="/">
                        <img src="/thirteen.svg" />
                    </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button 
                            size="mini" 
                            primary 
                            onClick={()=> router.push("/tasks/new")}
                        >
                            New Task
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}