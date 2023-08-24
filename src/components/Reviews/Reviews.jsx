/* eslint-disable react-hooks/exhaustive-deps */
import { movieReviews } from "Fetch/fetch";
import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewsItem } from "./Reviews.styled";
import Alert from 'react-bootstrap/Alert';
import { useStateContext } from "GlobalContext/GlobalContext";

export default function Reviews(){
    const [status, setStatus] = useState('idel');
    const { movieId } = useParams();
    const [results, setResults] = useState([]);
    const { erorrMessedge, setErorrMessedge } = useStateContext();

    const fetchReviews = async () => {
      setStatus('pending');
      try {
        const {results} = await movieReviews({
          movieId,
        });
        setResults([...results]);
        setStatus('resolved');
        if(!results.length){
          setStatus('rejected');
          setErorrMessedge('Reviews is not found');
        }
      } catch (error) {
        setStatus('rejected');
        setErorrMessedge('Oops...something went wrong, reload the page');
        console.log(error);
      }
    };
    useEffect(()=>{
      fetchReviews()
      return
    },[])
  
    if(status==='rejected'){
      return <Alert variant='light'>{erorrMessedge}</Alert>
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
    return (
      // <div>cast</div>
      <ul>
        {results.map(({ id, author, content }) => {
          return (
            <ReviewsItem key={id}>
              <h5>{author}</h5>
              <p>{content}</p>
            </ReviewsItem> 
          );
        })} 
      </ul>
    );
  }
  }