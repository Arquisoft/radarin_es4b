import { render, screen, act } from '@testing-library/react';
import Profile from '../../components/Profile/Profile';


test('app renders correctly for a spececific webID', () => {
    act(() => {
        sessionStorage.setItem("webID", "https://testpodasw.solidcommunity.net/profile/card#me");
        render(<Profile></Profile>);
        const element = screen.getByText("testpodasw");
        expect(element).toBeInTheDocument();
    });
});
