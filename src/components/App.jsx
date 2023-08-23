import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';


import Layout from 'layout/layout';

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const Cast = lazy(()=> import('../components/Cast/Cast'))
const Reviews = lazy(()=> import('../components/Reviews/Reviews'))
const NotFoundPage = lazy(()=> import('../components/NotFoundPage/NotFoundPage'))
const MovieDetails = lazy(()=> import('../components/MovieDetails/MovieDetails'))


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="movies" element={<Movies/>} />
        <Route path="movies/:movieId" element={<MovieDetails/>}>
          <Route path="cast" element={<Cast/>} />
          <Route path="reviews" element={<Reviews/>} />
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Route>
    </Routes>
  );
}
