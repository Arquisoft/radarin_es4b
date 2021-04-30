import { render,screen, act  } from '@testing-library/react';
import Friend from '../../components/Friends/Friend';

test('app renders without crashing', () => {
    act(() => {
        render(<Friend friendID="https://testpodasw.solidcommunity.net/profile/card#me" ></Friend>);
    });
});

