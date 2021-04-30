import React from 'react'
import { render, screen, act } from "@testing-library/react";
import UsersMapList from "../components/UsersMapList";

const friends = [
    {
        URL: 'https://amigo1',
        nombre: 'amigo1',
        latitud: 43.31231,
        longitud: -5.0002,
        altitud: 100.321,
        distancia: 200,
        fecha: 100,
    },
    {
        URL: 'https://amigo2',
        nombre: 'amigo2',
        latitud: 43.4321313,
        longitud: -5.1312321,
        altitud: 230,
        distancia: 150,
        fecha: 10120,
    },
];

test('check that the data are displayed correctly in the friends list (map)', async () => {
    render(<UsersMapList users={friends} fetchUsers={() => true} />);

    let element = screen.getByText("Friends list");
    expect(element).toBeInTheDocument();

    // Comprobamos que los datos se muestran de forma correcta 

    // Amigo 1 
    element = screen.getByText("amigo1");
    expect(element).toBeInTheDocument();

    // ¿Datos aproximados?

    // Latitud 
    element = screen.queryByText('43.31231');
    expect(element).toBeNull();
    element = screen.getByText("43.31");
    expect(element).toBeInTheDocument();

    // Longitud 
    element = screen.queryByText('-5.0002');
    expect(element).toBeNull();
    element = screen.getByText("-5.00");
    expect(element).toBeInTheDocument();

    // Altitud
    element = screen.queryByText('100.321');
    expect(element).toBeNull();
    element = screen.getByText("100.32");
    expect(element).toBeInTheDocument();


    // Amigo 2
    element = screen.getByText("amigo2");
    expect(element).toBeInTheDocument();

    // Latitud 
    element = screen.queryByText('43.4321313');
    expect(element).toBeNull();
    element = screen.getByText("43.43");
    expect(element).toBeInTheDocument();

    // Longitud 
    element = screen.queryByText('-5.1312321');
    expect(element).toBeNull();
    element = screen.getByText("-5.13");
    expect(element).toBeInTheDocument();

    // Altitud
    element = screen.queryByText('230');
    expect(element).toBeNull();
    element = screen.getByText("230.00");
    expect(element).toBeInTheDocument();
});