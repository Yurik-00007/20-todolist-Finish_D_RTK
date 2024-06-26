import React, {memo} from 'react';
import Container from "@mui/material/Container";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "features/TodolistsList/ui/TodolistsList";
import {Login} from "features/auth";

type Props={
    demo:boolean
}
export const Routing = memo(({demo}:Props) => {
    return (
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistsList demo={demo} />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/20-todolist-Finish_D_RTK'} element={<Login />} />
                <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path={'*'} element={<Navigate to={'/404'} />} />
            </Routes>
        </Container>
    );
});

