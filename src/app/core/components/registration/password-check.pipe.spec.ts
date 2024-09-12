import { PasswordCheckPipe } from './password-check.pipe';

describe('PasswordCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordCheckPipe();
    expect(pipe).toBeTruthy();
  });
});
