// import React from 'react';
// import Todo from './Todo';
// import AddTodo from './AddTodo';
// import { Paper, List, Container, Grid, Button,AppBar, Toolbar, Typography } from "@material-ui/core";
// import './App.css';
// import { call ,signout } from './service/ApiService';
// import Weather from './Weather'; // 추가된 부분: Weather 컴포넌트 임포트

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             loading : true,
//         };
//     }

//     add = (item) => {
//         call("/todo","POST",item).then((response) =>
//             this.setState({items:response.data})
//         );
//     }

//     delete = (item) => {
//         call("/todo","DELETE",item).then((response) =>
//             this.setState({items:response.data})
//         );
//     }

//     update = (item) => {
//         call("/todo","PUT",item).then((response) =>
//             this.setState({items:response.data})
//         );
//     }

//     componentDidMount(){
//         call("/todo","GET",null).then((response) =>
//             this.setState({items:response.data, loading: false})
//         );
//     }

//     render(){
//         var todoItems = this.state.items.length > 0 && 
//         (<Paper style={{margin:16}}>
//             <List> 
//                 {this.state.items.map((item,idx) => (
//             <Todo item = {item} key = {item.id} delete = {this.delete} update = {this.update} />
//                 ))}
//                 </List>
//             </Paper>
//         );

//         var navigationBar = (
//             <AppBar position="static">
//                 <Toolbar>
//                     <Grid justifyContent="space-between" container>
//                     <Grid item>
//                         <Typography variant = "h6">오늘의 할일</Typography>
//                     </Grid>
//                     <Grid item>
//                         <Button color = "inherit" onClick={signout}>logout</Button>
//                     </Grid>

//                     </Grid>
//                 </Toolbar>
//             </AppBar>
//         );


//         var todoListPage = (
//             <div>
//                 {navigationBar}
//                 <Container maxWidth = "md">
//                     <AddTodo add={this.add} />
//                     <div className = "TodoList">{todoItems}</div>
//                 </Container>
//                 <Container maxWidth = "md">
//                     <Weather/>
//                 </Container>
//             </div>
//         );

//         var loadingPage = <h1>로딩중..</h1>
//         var content = loadingPage;
        
//         if(!this.state.loading){
//             content = todoListPage;
//         }
//         return (
//             <div className = "App">
//                 {content}
//             </div>
//         );
//     }
// }

// export default App;

//날씨만 넣은 버전
import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';
import Weather from './Weather';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            currentPage: 1,
            itemsPerPage: 10,
        };
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) =>
            this.setState({ items: response.data })
        );
    }

    delete = (item) => {
        call("/todo", "DELETE", item).then((response) =>
            this.setState({ items: response.data })
        );
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response) =>
            this.setState({ items: response.data })
        );
    }

    componentDidMount() {
        call("/todo", "GET", null).then((response) =>
            this.setState({ items: response.data, loading: false })
        );
    }

    handlePageChange = (event, value) => {
        this.setState({ currentPage: value });
    }

    render() {
        const { items, currentPage, itemsPerPage } = this.state;

        // Calculate the items to display on the current page
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

        const todoItems = currentItems.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {currentItems.map((item, idx) => (
                        <Todo
                            item={item}
                            key={item.id}
                            delete={this.delete}
                            update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );

        const navigationBar = (
            <AppBar position="static">
                <Toolbar>
                    <Grid justifyContent="space-between" container>
                        <Grid item>
                            <Typography variant="h6">오늘의 할일</Typography>
                        </Grid>
                        <Grid item>
                            <Button color="inherit" onClick={signout}>logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const pageButtons = (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {pageNumbers.map(number => (
                    <Button key={number} onClick={() => this.handlePageChange(null, number)}>
                        {number}
                    </Button>
                ))}
            </div>
        );

        const todoListPage = (
            <div>
                {navigationBar}
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Weather />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <AddTodo add={this.add} />
                            <div className="TodoList">{todoItems}</div>
                            {pageButtons}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );

        const loadingPage = <h1>로딩중..</h1>;
        const content = this.state.loading ? loadingPage : todoListPage;

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;

