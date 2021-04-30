import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";
import UserFriendsList from "../components/Friends/UserFriendsList";

test('user friends list component renders without crashing', () => {
    const { container } = render(<UserFriendsList />);
    expect(container).toBeTruthy();
});

test('check that the add friend option is available', async () => {
    render(<UserFriendsList />);
    let element = screen.getByText("Friends list");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Add friend");
    expect(element).toBeInTheDocument();
    element = screen.getByText("Add");
    expect(element).toBeInTheDocument();
});