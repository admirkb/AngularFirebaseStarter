import { MyFirstFBAppPage } from './app.po';

describe('my-first-fbapp App', () => {
  let page: MyFirstFBAppPage;

  beforeEach(() => {
    page = new MyFirstFBAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
