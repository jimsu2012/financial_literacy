import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ExplorePage from "./pages/ExplorePage";
import HabitsPage from "./pages/HabitsPage";
import LessonExplorer from "./pages/LessonExplorer";
import Lesson from "./pages/Lesson";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import HabitUpdatePage from "./pages/HabitUpdatePage";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/" exact component={IndexPage} />
        <ProtectedRoute path="/account" exact component={AccountPage} />
        <Route path="/explore" exact component={ExplorePage} />
        <ProtectedRoute
          path="/lesson-explorer/:id/:name"
          exact
          component={LessonExplorer}
        />
        <ProtectedRoute path="/lesson/:id/:number" exact component={Lesson} />

        <ProtectedRoute path="/habits" exact component={HabitsPage} />
        <ProtectedRoute
          path="/habits/goals/:id"
          exact
          component={HabitUpdatePage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
