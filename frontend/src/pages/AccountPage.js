import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, getAxiosConfig, getUserId } from "../constants";

const AccountArticle = ({ articleId }) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/api/articles/${articleId}/`);
      setArticle(response.data);
      setLoading(false);
    };

    fetchData();
  }, [articleId]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <Link to={`/lesson/:id/${articleId}`}>{article.title}</Link>
      )}
    </div>
  );
};

const AccountHabit = ({ habitId }) => {
  const [habit, setHabit] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/habits/${habitId}/`,
        getAxiosConfig()
      );
      setHabit(response.data);
      setLoading(false);
    };

    fetchData();
  }, [habitId]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <Link to={`/habits/${habitId}`}>{habit.title}</Link>
        </div>
      )}
    </div>
  );
};

const AccountPage = () => {
  const [articlesBookmarked, setArticlesBookmarked] = useState([]);
  const [articlesLiked, setArticlesLiked] = useState([]);
  const [habitsOwned, setHabitsOwned] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/users/${getUserId()}/`,
        getAxiosConfig()
      );
      const data = response.data;
      setArticlesBookmarked(data.articles_bookmarked);
      setArticlesLiked(data.articles_liked);
      setHabitsOwned(data.habits_owned);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>Articles Bookmarked</h1>
        {articlesBookmarked
          ? articlesBookmarked.map((article) => (
              <AccountArticle key={article} articleId={article} />
            ))
          : ""}
      </div>
      <div>
        <h1>Articles Liked</h1>
        {articlesLiked
          ? articlesLiked.map((article) => (
              <AccountArticle key={article} articleId={article} />
            ))
          : ""}
      </div>
      <div>
        <h1>Habits Owned</h1>
        {habitsOwned
          ? habitsOwned.map((habit) => (
              <AccountHabit key={habit} habitId={habit} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default AccountPage;
