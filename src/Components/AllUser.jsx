import { useEffect, useState } from 'react';
import { Table, TableCell, TableRow, TableHead, TableBody, makeStyles, Button } from '@material-ui/core';
import { deleteUser, getAllUsers } from '../service/api';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    table: {
    width: '80%',
    margin: '50px 100px 100px 140px',
    },
    thead: {
    '& > *': {
        background: '#000000',
        color: '#FFFFFF',
        fontSize: '16px',
    },
    },
    trow: {
    '& > *': {
        fontSize: '16px',
    },
    },
});

const AllUsers = () => {
    const classes = useStyle();
    const [users, setUsers] = useState([]);

    useEffect(() => {
    getUsers();
    }, []);

    const getUsers = async () => {
    const response = await getAllUsers();
    console.log(response);
    if (response && response.data) {
        setUsers(response.data);
    }
    };

    const deleteData = async (id) => {
    await deleteUser(id);
    getUsers();
    };

    return (
    <Table className={classes.table}>
        <TableHead>
        <TableRow className={classes.thead}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {users.map((data) => (
            <TableRow key={data.id} className={classes.trow}>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.username}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phone}</TableCell>
            <TableCell>
                <Button
                variant="contained"
                color="primary"
                style={{ margin: '0px 20px' }}
                component={Link}
                to={`/edit/${data.id}`}
                >
                Edit
                </Button>
                <Button
                variant="contained"
                color="secondary"
                style={{ margin: '0px 20px' }}
                onClick={() => deleteData(data.id)}
                >
                Delete
                </Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    );
};

export default AllUsers;