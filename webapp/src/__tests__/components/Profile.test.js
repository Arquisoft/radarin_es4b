import { render, screen  } from '@testing-library/react';
import Profile from '../../components/Profile/Profile';


test('app renders without crashing', () => {
    sessionStorage.setItem("webID","https://testpodasw.solidcommunity.net/profile/card#me"); 
    render(<Profile></Profile>);
    const element = screen.getByText("testpodasw");
    expect(element).toBeInTheDocument();
});
