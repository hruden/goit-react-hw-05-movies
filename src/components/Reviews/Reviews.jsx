/* eslint-disable react-hooks/exhaustive-deps */
import { movieReviews } from "Fetch/fetch";
import { useStateContext } from "GlobalContext/GlobalContext";
import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Reviews(){
    const { status, setStatus } = useStateContext();
    const { movieId } = useParams();
    const [results, setResults] = useState([]);
    const fetchReviews = async () => {
      setStatus('pending');
      try {
        const {results} = await movieReviews({
          movieId,
        });
        setResults([...results]);
        setStatus('resolved');
        console.log(results)
      } catch (error) {
        setStatus('rejected');
        // setErorrMessedge('Oops...something went wrong');
        console.log(error);
      }
    };
    useEffect(()=>{
      fetchReviews()
      return
    },[results])
  
    if(status==='rejected'){
      return <div>oops</div>
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
            <li key={id}>
              <h5>{author}</h5>
              <p>{content}</p>
            </li> 
          );
        })} 
      </ul>
    );
  }
  }