import { render, screen } from '@testing-library/react-native';
import Index from "@/index";

test('basic test', async () => {
    render(<Index/>);
    const element = await screen.findByText(/edit/i, {}, { timeout: 5000 });
    expect(element).toBeTruthy();

});
