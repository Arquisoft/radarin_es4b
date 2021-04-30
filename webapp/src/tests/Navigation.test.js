import React from 'react'
import { render, screen } from "@testing-library/react";
import App from "../App";

test('check menu options when user is not authenticated', async () => {
    render(<App />);

    // Se comprueba que no aparecen ciertas opciones en el menú de navegación

    let element = screen.getByText("Log in");
    expect(element).toBeInTheDocument();

    element = screen.getByText("Language");
    expect(element).toBeInTheDocument();

    // Se comprueba que no aparecen ciertas opciones en el menú de navegación

    element = screen.queryByText('Log out');
    expect(element).toBeNull();

    element = screen.queryByText('List friends');
    expect(element).toBeNull();

    element = screen.queryByText('See map');
    expect(element).toBeNull();

    element = screen.queryByText('Admin');
    expect(element).toBeNull();
});
