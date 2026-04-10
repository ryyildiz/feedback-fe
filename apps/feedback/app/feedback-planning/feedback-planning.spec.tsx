import { render } from '@testing-library/react';

import FeedbackPlanning from './feedback-planning';

describe('FeedbackPlanning', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeedbackPlanning />);
    expect(baseElement).toBeTruthy();
  });
});
