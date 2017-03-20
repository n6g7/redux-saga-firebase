import ReduxSagaFirebase from './index';

describe('ReduxSagaFirebase', () => {
  it('takes a firebase app as argument', () => {
    const app = 'kqdlqkd';
    const rsf = new ReduxSagaFirebase(app);

    expect(rsf.app).toBe(app);
  });

  it('defines authentication methods', () => {
    const app = 'kqdlqkd';
    const rsf = new ReduxSagaFirebase(app);

    expect(rsf.login).toBeInstanceOf(Function);
    expect(rsf.logout).toBeInstanceOf(Function);
    expect(rsf.authChannel).toBeInstanceOf(Function);
  });
});
