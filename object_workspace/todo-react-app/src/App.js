import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Weather from './Weather';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, IconButton, TextField } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import './App.css';
import { call, signout } from './service/ApiService';
import { format, addDays, subDays } from 'date-fns';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            selectedDate: new Date()
        };
    }

    add = (item) => {
        item.todoDate = format(this.state.selectedDate, 'yyyy-MM-dd'); // 선택된 날짜로 설정
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
        this.fetchTodos();
    }

    fetchTodos = () => {
        const dateStr = format(this.state.selectedDate, 'yyyy-MM-dd');
        call("/todo", "GET", { todoDate: dateStr }).then((response) =>
            this.setState({ items: response.data, loading: false })
        );
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date }, this.fetchTodos);
    }

    handlePrevDay = () => {
        this.setState((prevState) => ({
            selectedDate: subDays(prevState.selectedDate, 1)
        }), this.fetchTodos);
    }

    handleNextDay = () => {
        this.setState((prevState) => ({
            selectedDate: addDays(prevState.selectedDate, 1)
        }), this.fetchTodos);
    }

    render() {
        var todoItems = this.state.items.length > 0 &&
            (<Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </List>
            </Paper>
            );

        var navigationBar = (
            <AppBar position="static">
                <Toolbar>
                    <Grid justifyContent="space-between" container>
                        <Grid item>
                            <Typography variant="h6">오늘 하루</Typography>
                        </Grid>
                        <Grid item>
                            <Button color="inherit" onClick={signout}>logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

        var todoListPage = (
            <div>
                {navigationBar}
                <Container maxWidth="lg"> {/* 최대 가로 너비를 더 넓게 설정 */}
                    <Weather />
                    <Grid container justifyContent="space-between" alignItems="center" style={{ margin: '16px 0' }}>
                        <Grid item>
                            <IconButton onClick={this.handlePrevDay}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={this.handleNextDay}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );

        var loadingPage = <h1>로딩중..</h1>;
        var content = loadingPage;

        if (!this.state.loading) {
            content = todoListPage;
        }
        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;


