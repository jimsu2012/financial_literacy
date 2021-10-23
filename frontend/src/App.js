import { BrowserRouter, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ExplorePage from "./pages/ExplorePage";
import HabitsPage from "./pages/HabitsPage";
import LessonExplorer from "./pages/LessonExplorer";
import Lesson from "./pages/Lesson";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={IndexPage} />
      <Route path="/account" exact component={AccountPage} />
      <Route path="/explore" exact component={ExplorePage} />
      <Route
        path="/lesson-explorer/:id/:name"
        exact
        component={LessonExplorer}
      />
      <Route path="/lesson/:id/:number" exact component={Lesson} />
      <Route path="/habits" component={HabitsPage} />
    </BrowserRouter>
  );
}

export default App;
