import { render, screen } from '@testing-library/react-native';
import Index from "../../index";

test('basic test', () => {
    render(<Index />);
    expect(screen.getByText(/edit/i)).toBeOnTheScreen()

});
